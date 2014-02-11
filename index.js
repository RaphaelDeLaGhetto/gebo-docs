'use strict';

var q = require('q'),
    rimraf = require('rimraf'),
    tmp = require('tmp'),
    exec = require('child_process').exec;

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
 *
 * @return string
 */
exports.convertToText = function(path) {
    var deferred = q.defer();

    tmp.tmpName(function(err, tmpPath) {
        if (err) {
          deferred.reject(err);
        }

        // We're going by the file extension, for better
        // or for worse
        var extension = path.split('.').pop().toLowerCase();
        var command;
        var skip = false;
    
        switch(extension) {
            case 'pdf':
                command = 'pdftotext ' + path + ' -';
                skip = true;
                break;
            case 'doc':
            case 'docx':
            case 'odt':
            case 'rtf':

                command = 'unoconv --doctype=document --format=text --output=' + tmpPath + ' ' + path;
                break;
            default:
                command = 'cat ' + path;
                skip = true;
                break;
        }
    
        if (command) {
          // Write the converted document to a temporary file
          exec(command, function(err, stdout, stderr) {
              if (err) {
                deferred.reject(err);
              }
              else {
                if (skip) {
                  deferred.resolve(stdout);
                } 
                else {
                  // Get the contents of the converted file
                  var filename = path.split('/').pop().split('.'); 
                  filename.pop();
                  filename = filename.join('.') + '.txt';

                  exec('cat ' + tmpPath + '/' + filename,
                    function(err, stdout, stderr) {
                      if (err) {
                        deferred.reject(err);
                      }
                      else {
                        rimraf(tmpPath, function(err) {
                          if (err) {
                            deferred.reject(err);
                          }
                          else {
                            deferred.resolve(stdout);
                          }
                        });
                      }
                    });
                }
              }
            });
        }
      });

    return deferred.promise;
  };

/**
 * Convert the document to XML to extract formatting information
 *
 * This function requires pdftohtml
 *
 * @param string
 *
 * @return string
 */
exports.convertToXml = function(path) {
    var deferred = q.defer();

    // A PDF gets directly converted to XML
    var extension = path.split('.').pop().toLowerCase();
    var command;

    if (extension === 'pdf') {
      command = 'pdftohtml -stdout -xml ' + path;

      exec(command, function(err, stdout, stderr) {
        if (err) {
          deferred.reject(err);
        }

        if (stderr) {
          deferred.reject(err);
        }
        else {
          deferred.resolve(stdout);
        }
      });
    }
    else {
      tmp.tmpName(function(err, tmpPath) {
        if (err) {
          deferred.reject(err);
        }

        command = 'unoconv --doctype=document --format=pdf --output=' + tmpPath + ' ' + path;

        // Convert non-PDF document to PDF
        exec(command, function(err, stdout, stderr) {
          if (err) {
            deferred.reject(err);
          }
          else {
            // Convert PDF to XML
            var filename = path.split('/').pop().split('.'); 
            filename.pop();
            filename = filename.join('.') + '.pdf';

            command = 'pdftohtml -stdout -xml ' + tmpPath + '/' + filename;

            exec(command, function(err, stdout, stderr) {
              if (err) {
                deferred.reject(err);
              }
              else {
                rimraf(tmpPath, function(err) {
                    if (err) {
                      deferred.reject(err);
                    }
                    else {
                      deferred.resolve(stdout);
                    }
                  });
              }
            });
          }
        });
      });
    }

    return deferred.promise;
  };


