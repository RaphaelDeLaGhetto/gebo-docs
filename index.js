'use strict';

var q = require('q'),
    rimraf = require('rimraf'),
    tmp = require('tmp'),
    exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    nconf = require('nconf'),
    sprintf = require('sprintf-js').sprintf,
    winston = require('winston');

module.exports = function() {

    var logger = new (winston.Logger)({ transports: [ new (winston.transports.Console)({ colorize: true }) ] });

    /**
     * Start an unoconv listener
     *
     * @returns promise
     */
//    function _startUnoconvListener() {
//        var deferred = q.defer();
//
//        // Get unoconv PID
//        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\''
//        exec(command, function(err, stdout, stderr) {
//            var unoconvId = stdout;
//
//            // Get LibreOffice PID
//            command = 'ps ax | grep soffice.bin | grep -v grep | awk \'{print $1}\''
//            exec(command, function(err, stdout, stderr) {
//                var sofficeId = stdout;
//
//                // Kill the existing processes
//                command = 'kill ' + unoconvId + ' ' + sofficeId;
//                exec(command, function(err, stdout, stderr) {
//
//                    // Start the unoconv listener
//                    command = 'unoconv --listener &';
//                    var unoconv = spawn('unoconv', ['--listener'], ['&']);
//
//                        // Make sure unoconv is running
//                        command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\''
//                        exec(command, function(err, stdout, stderr) {
//                            if (stdout == unoconv.pid) {
//                              deferred.resolve();
//                            }
//                            else {
//                              deferred.reject('unoconv not started');
//                            }
//                          });
//                  });
//              });
//          });
//
//        return deferred.promise;
//      };
//    exports.startUnoconvListener = _startUnoconvListener;

    /**
     * See if the unoconv listener is running.
     * If not, execute
     *
     * @returns promise
     */
//    function _checkUnoconv() {
//        var deferred = q.defer();
//
//        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\''
//        exec(command, function(err, stdout, stderr) {
//            if (stdout) {
//              deferred.resolve();
//            }
//            else {
//              _startUnoconvListener().
//                then(function() {
//                    deferred.resolve();
//                  }).
//                catch(function(err) {
//                    // The conversion functions still get a chance to run,
//                    // even if the listener isn't started successfully
//                    deferred.resolve();
//                    //deferred.reject('checkUnoconv: ' + err);
//                  });
//            }
//          });
//
//        return deferred.promise;
//      };
//    exports.checkUnoconv = _checkUnoconv;

    /**
     * Convert the given document to text
     *
     * This function requires LibreOffice 4.1, unoconv 0.6
     * and pdftotext
     *
     * unoconv and LibreOffice don't let me write to stdout
     * for some reason. This is probably a bug. For now, output will
     * have to be written to temporary file
     *
     * @param string
     * @param options
     *
     * @return string
     */
    function _convertToText(path, options) {
        var deferred = q.defer();
        path = _sanitizePath(path);    

        if (!options) {
          options = {};
        }


        //nconf.file({ file: root + '/gebo-docs.json' });
        nconf.file({ file: './gebo-docs.json' });

        tmp.tmpName(function(err, tmpPath) {
            if (err) {
              deferred.reject(err);
            }
        
            // We're going by the file extension, for better
            // or for worse
            _getExtension(path).
                then(function(extension) {

                    var command = sprintf(nconf.get(extension), path);
        
                    // If no file extension found
                    if (!command) {
                      command = sprintf(nconf.get('default'), path);
                    }
                    
                    // If default command not set in gebo-docs.json
                    if (!command) {
                      command = 'cat ' + path;
                    }
         
                    // Write the converted document to a temporary file
                    exec(command, options, function(err, stdout, stderr) {
                        if (stderr) {
                          logger.info('Command:', command);
                          logger.error('stderr:', stderr);
                          deferred.reject(stderr);
                        }
                        else if (err) {
                          logger.info('Command:', command);
                          logger.error(err);
                          deferred.reject(err);
                        }
                        else {
                          deferred.resolve(stdout);
                        }
                      });
                  }).
                catch(function(err) {
                    deferred.reject(err);
                  });
          });
    
        return deferred.promise;
      };
    exports.convertToText = _convertToText;
    
    /**
     * Get the file's extension if it exists. Guess and
     * return the file type otherwise.
     *
     * @param string
     *
     * @return string
     */
    function _getExtension(path) {
        var deferred = q.defer();

        // Get the file extension
        var pathParts = path.split('.');

        if (pathParts.length > 1) {
          deferred.resolve(pathParts.pop().toLowerCase());
        }
        else {
          // This file has no extension. Try to guess the file type.
          exec('file --mime-type ' + path, function(err, stdout, stderr) {
              if (err) {
                deferred.reject(err);
              }
              else {
                var type = stdout.trim().split('/').pop().toLowerCase();
                switch (type) {
                    case 'msword':
                        type = 'doc';
                        break;
                    case 'zip':
                        type = 'docx';
                        break;
                    case 'vnd.oasis.opendocument.text':
                        type = 'odt';
                        break;
                    case 'plain':
                        type = 'txt';
                        break;
                };
                deferred.resolve(type);
              }
            });
        }

        return deferred.promise;
      };
    exports.getExtension = _getExtension;

    /**
     * Convert the document to XML to extract formatting information
     *
     * This function requires pdftohtml
     *
     * @param string
     *
     * @return string
     */
//    function _convertToXml(path) {
//        var deferred = q.defer();
//	    path = _sanitizePath(path);    
//
//        _checkUnoconv().
//            then(function() { 
//                // A PDF gets directly converted to XML
//                var extension = path.split('.').pop().toLowerCase();
//                var command;
//            
//                if (extension === 'pdf') {
//                  command = 'pdftohtml -stdout -xml ' + path;
//            
//                  exec(command, function(err, stdout, stderr) {
//                    if (err) {
//                      deferred.reject(err);
//                    }
//            
//                    if (stderr) {
//                      deferred.reject(err);
//                    }
//                    else {
//                      deferred.resolve(stdout);
//                    }
//                  });
//                }
//                else {
//                  tmp.tmpName(function(err, tmpPath) {
//                    if (err) {
//                      deferred.reject(err);
//                    }
//            
//                    command = 'unoconv --doctype=document --format=pdf --output=' + tmpPath + ' ' + path;
//            
//                    // Convert non-PDF document to PDF
//                    exec(command, function(err, stdout, stderr) {
//                      if (err) {
//                        deferred.reject(err);
//                      }
//                      else {
//                        // Convert PDF to XML
//                        var filename = path.split('/').pop().split('.'); 
//                        filename.pop();
//                        filename = filename.join('.') + '.pdf';
//            
//                        command = 'pdftohtml -stdout -xml ' + tmpPath + '/' + filename;
//            
//                        exec(command, function(err, stdout, stderr) {
//                          if (err) {
//                            deferred.reject(err);
//                          }
//                          else {
//                            rimraf(tmpPath, function(err) {
//                                if (err) {
//                                  deferred.reject(err);
//                                }
//                                else {
//                                  deferred.resolve(stdout);
//                                }
//                              });
//                          }
//                        });
//                      }
//                    });
//                  });
//                }
//          }).
//        catch(function(err) {
//            deferred.reject(err);
//          });
// 
//        return deferred.promise;
//      };
//    exports.convertToXml = _convertToXml;
    
    /**
     * The text/XML conversion programs don't like spaces
     * or brackets in their pathnames (from what's been seen
     * so far).
     *
     * @param String
     *
     * @return String
     */
    function _sanitizePath(path) {

	// Escape brackets
	path = path.replace(/\(/g, '\\(');
	path = path.replace(/\)/g, '\\)');

	// Escape spaces
	path = path.replace(/ /g, '\\ ');

	// Reverse double escapes
	path = path.replace(/\\\\/g, '\\');

	return path;
      };
    exports.sanitizePath = _sanitizePath;

    return exports;
  }();
