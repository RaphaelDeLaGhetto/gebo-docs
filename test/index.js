var doc = require('..'),
    fs = require('fs'),
    rimraf = require('rimraf'),
    exec = require('child_process').exec;

/**
 * convertToText
 */
exports.convertToText = {

    'Return text when given a Microsoft doc': function(test) {
        test.expect(1);
        doc.convertToText('test/docs/doc.doc').
            then(function(text) {
                    test.equal(text, 'This is supposed to be a Microsoft Word doc. ' +
                                     'It was created with LibreOffice.\n');
                    test.done();
              }).
            catch(function(err) {
                    console.log('err');
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Delete temp file containing converted Microsoft DOC text': function(test) {
        test.expect(2);
        var count = fs.readdirSync('/tmp').length;

        doc.convertToText('test/docs/doc.doc').
            then(function(text) {
                    test.equal(text, 'This is supposed to be a Microsoft Word doc. ' +
                                     'It was created with LibreOffice.\n');
                    test.equal(count, fs.readdirSync('/tmp').length);
                    test.done();
              }).
            catch(function(err) {
                    console.log('err');
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a Microsoft docx': function(test) {
        test.expect(1);
        doc.convertToText('test/docs/docx.docx').
            then(function(text) {
                    test.equal(text, 'This is supposed to be a Microsoft docx. ' + 
                                     'It was created with Google Docs.\n');
                    test.done();
              }).
            catch(function(err) {
                    console.log('err');
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Delete temp file containing converted Microsoft DOCX text': function(test) {
        test.expect(2);
        var count = fs.readdirSync('/tmp').length;

        doc.convertToText('test/docs/docx.docx').
            then(function(text) {
                    test.equal(text, 'This is supposed to be a Microsoft docx. ' +
                                     'It was created with Google Docs.\n');
                    test.equal(count, fs.readdirSync('/tmp').length);
                    test.done();
              }).
            catch(function(err) {
                    console.log('err');
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given an OpenOffice ODT': function(test) {
        test.expect(1);
        doc.convertToText('test/docs/odt.odt').
            then(function(text) {
                    test.equal(text, 'This is an OpenOffice odt document. ' +
                                     'It was created with LibreOffice.\n');
                    test.done();
              }).
            catch(function(err) {
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Delete temp file containing converted OpenOffice ODT text': function(test) {
        test.expect(2);
        var count = fs.readdirSync('/tmp').length;

        doc.convertToText('test/docs/odt.odt').
            then(function(text) {
                    test.equal(text, 'This is an OpenOffice odt document. ' +
                                     'It was created with LibreOffice.\n');
                    test.equal(count, fs.readdirSync('/tmp').length);
                    test.done();
              }).
            catch(function(err) {
                    console.log('err');
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a Google Doc PDF': function(test) {
        test.expect(1);
        doc.convertToText('test/docs/pdf.pdf').
            then(function(text) {
                    test.equal(text, 'This is a pdf. It was created with Google Docs.\n\n\f');
                    test.done();
              }).
            catch(function(err) {
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a LibreOffice rtf': function(test) {
        test.expect(1);
        doc.convertToText('test/docs/rtf.rtf').
            then(function(text) {
                    test.equal(text, 'This is an rtf document. It was created with LibreOffice.\n');
                    test.done();
              }).
            catch(function(err) {
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Delete temp file containing converted LibreOffice RTF text': function(test) {
        test.expect(2);
        var count = fs.readdirSync('/tmp').length;

        doc.convertToText('test/docs/rtf.rtf').
            then(function(text) {
                    test.equal(text, 'This is an rtf document. ' +
                                     'It was created with LibreOffice.\n');
                    test.equal(count, fs.readdirSync('/tmp').length);
                    test.done();
              }).
            catch(function(err) {
                    console.log('err');
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return text when given a txt document': function(test) {
        test.expect(1);
        doc.convertToText('test/docs/txt.txt').
            then(function(text) {
                    test.equal(text, 'This is a txt document. It was created with VIM.\n');
                    test.done();
              }).
            catch(function(err) {
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

//    'Start an unoconv listener if it\'s not already running': function(test) {
//        test.expect(2);
//        // Make sure unoconv is not running
//        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
//        exec(command, function(err, stdout, stderr) {
//            command = 'kill ' + stdout;
//            exec(command, function(err, stdout, stderr) {
//                test.equal(stdout, '');
//                doc.convertToText('test/docs/txt.txt').
//                    then(function(text) {
//                        command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
//                        exec(command, function(err, stdout, stderr) {
//                            test.notEqual(stdout, '');
//                            test.done();
//                          });
//                      }).
//                    catch(function(err) {
//                        console.log(err);
//                        test.ok(false, err);
//                        test.done();
//                      });
//              });
//          });
//    },
};

/**
 * convertToXml
 */
exports.convertToXml = {

    'Return XML when given a PDF': function(test) {
        test.expect(1);
        doc.convertToXml('test/docs/pdf.pdf').
            then(function(text) {
                test.equal(text, '<?xml version="1.0" encoding="UTF-8"?>\n' +
                                 '<!DOCTYPE pdf2xml SYSTEM "pdf2xml.dtd">\n\n' +
                                 '<pdf2xml producer="poppler" version="0.24.5">\n' +
                                 '<page number="1" position="absolute" top="0" left="0" height="1188" width="918">\n' +
                                    '\t<fontspec id="0" size="14" family="Times" color="#000000"/>\n' +
                                 '<text top="110" left="108" width="347" height="19" font="0">' +
                                 'This is a pdf. It was created with Google Docs.</text>\n' +
                                 '</page>\n' +
                                 '</pdf2xml>\n');
                test.done();
              }).
            catch(function(err) {
                console.log(err);
                test.ok(false, err);
                test.done();
              });
    },

    'Return XML when given a DOC': function(test) {
        test.expect(1);
        doc.convertToXml('test/docs/doc.doc').
            then(function(text) {
                test.equal(text, '<?xml version="1.0" encoding="UTF-8"?>\n' +
                                 '<!DOCTYPE pdf2xml SYSTEM "pdf2xml.dtd">\n\n' +
                                 '<pdf2xml producer="poppler" version="0.24.5">\n' +
                                 '<page number="1" position="absolute" top="0" left="0" height="1188" width="918">\n' +
                                    '\t<fontspec id="0" size="16" family="Times" color="#000000"/>\n' +
                                 '<text top="86" left="85" width="561" height="20" font="0">' +
                                 'This is supposed to be a Microsoft Word doc. It was created with LibreOffice.</text>\n' +
                                 '</page>\n' +
                                 '</pdf2xml>\n');
                test.done();
              }).
            catch(function(err) {
                console.log(err);
                test.ok(false, err);
                test.done();
              });
    },

    'Delete temp file containing XML-converted Microsoft DOC data': function(test) {
        test.expect(2);
        var count = fs.readdirSync('/tmp').length;

        doc.convertToXml('test/docs/doc.doc').
            then(function(text) {
                 test.equal(text, '<?xml version="1.0" encoding="UTF-8"?>\n' +
                                 '<!DOCTYPE pdf2xml SYSTEM "pdf2xml.dtd">\n\n' +
                                 '<pdf2xml producer="poppler" version="0.24.5">\n' +
                                 '<page number="1" position="absolute" top="0" left="0" height="1188" width="918">\n' +
                                    '\t<fontspec id="0" size="16" family="Times" color="#000000"/>\n' +
                                 '<text top="86" left="85" width="561" height="20" font="0">' +
                                 'This is supposed to be a Microsoft Word doc. It was created with LibreOffice.</text>\n' +
                                 '</page>\n' +
                                 '</pdf2xml>\n');
                    test.equal(count, fs.readdirSync('/tmp').length);
                    test.done();
              }).
            catch(function(err) {
                    console.log('err');
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return XML when given a DOCX': function(test) {
        test.expect(1);
        doc.convertToXml('test/docs/docx.docx').
            then(function(text) {
                test.equal(text, '<?xml version="1.0" encoding="UTF-8"?>\n' +
                                 '<!DOCTYPE pdf2xml SYSTEM "pdf2xml.dtd">\n\n' +
                                 '<pdf2xml producer="poppler" version="0.24.5">\n' +
                                 '<page number="1" position="absolute" top="0" left="0" height="1188" width="918">\n' +
                                    '\t<fontspec id="0" size="16" family="Times" color="#000000"/>\n' +
                                 '<text top="109" left="108" width="536" height="20" font="0">' +
                                 'This is supposed to be a Microsoft docx. It was created with Google Docs.</text>\n' +
                                 '</page>\n' +
                                 '</pdf2xml>\n');
                test.done();
              }).
            catch(function(err) {
                console.log(err);
                test.ok(false, err);
                test.done();
              });
    },

    'Delete temp file containing XML-converted Microsoft DOCX data': function(test) {
        test.expect(2);
        var count = fs.readdirSync('/tmp').length;

        doc.convertToXml('test/docs/docx.docx').
            then(function(text) {
                test.equal(text, '<?xml version="1.0" encoding="UTF-8"?>\n' +
                                 '<!DOCTYPE pdf2xml SYSTEM "pdf2xml.dtd">\n\n' +
                                 '<pdf2xml producer="poppler" version="0.24.5">\n' +
                                 '<page number="1" position="absolute" top="0" left="0" height="1188" width="918">\n' +
                                    '\t<fontspec id="0" size="16" family="Times" color="#000000"/>\n' +
                                 '<text top="109" left="108" width="536" height="20" font="0">' +
                                 'This is supposed to be a Microsoft docx. It was created with Google Docs.</text>\n' +
                                 '</page>\n' +
                                 '</pdf2xml>\n');
                    test.equal(count, fs.readdirSync('/tmp').length);
                    test.done();
              }).
            catch(function(err) {
                    console.log('err');
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return XML when given an ODT': function(test) {
        test.expect(1);
        doc.convertToXml('test/docs/odt.odt').
            then(function(text) {
                test.equal(text, '<?xml version="1.0" encoding="UTF-8"?>\n' +
                                 '<!DOCTYPE pdf2xml SYSTEM "pdf2xml.dtd">\n\n' +
                                 '<pdf2xml producer="poppler" version="0.24.5">\n' +
                                 '<page number="1" position="absolute" top="0" left="0" height="1188" width="918">\n' +
                                    '\t<fontspec id="0" size="16" family="Times" color="#000000"/>\n' +
                                 '<text top="86" left="85" width="501" height="20" font="0">' +
                                 'This is an OpenOffice odt document. It was created with LibreOffice.</text>\n' +
                                 '</page>\n' +
                                 '</pdf2xml>\n');
                test.done();
              }).
            catch(function(err) {
                console.log(err);
                test.ok(false, err);
                test.done();
              });
    },

    'Delete temp file containing XML-converted ODT data': function(test) {
        test.expect(2);
        var count = fs.readdirSync('/tmp').length;

        doc.convertToXml('test/docs/odt.odt').
            then(function(text) {
                test.equal(text, '<?xml version="1.0" encoding="UTF-8"?>\n' +
                                 '<!DOCTYPE pdf2xml SYSTEM "pdf2xml.dtd">\n\n' +
                                 '<pdf2xml producer="poppler" version="0.24.5">\n' +
                                 '<page number="1" position="absolute" top="0" left="0" height="1188" width="918">\n' +
                                    '\t<fontspec id="0" size="16" family="Times" color="#000000"/>\n' +
                                 '<text top="86" left="85" width="501" height="20" font="0">' +
                                 'This is an OpenOffice odt document. It was created with LibreOffice.</text>\n' +
                                 '</page>\n' +
                                 '</pdf2xml>\n');
                    test.equal(count, fs.readdirSync('/tmp').length);
                    test.done();
              }).
            catch(function(err) {
                    console.log('err');
                    console.log(err);
                    test.ok(false, err);
                    test.done();
              });
    },

    'Return XML when given an RTF': function(test) {
        test.expect(1);
        doc.convertToXml('test/docs/rtf.rtf').
            then(function(text) {
                test.equal(text, '<?xml version="1.0" encoding="UTF-8"?>\n' +
                                 '<!DOCTYPE pdf2xml SYSTEM "pdf2xml.dtd">\n\n' +
                                 '<pdf2xml producer="poppler" version="0.24.5">\n' +
                                 '<page number="1" position="absolute" top="0" left="0" height="1188" width="918">\n' +
                                    '\t<fontspec id="0" size="16" family="Times" color="#000000"/>\n' +
                                 '<text top="86" left="85" width="406" height="20" font="0">' +
                                 'This is an rtf document. It was created with LibreOffice.</text>\n' +
                                 '</page>\n' +
                                 '</pdf2xml>\n');
                test.done();
              }).
            catch(function(err) {
                console.log(err);
                test.ok(false, err);
                test.done();
              });
    },

    'Delete temp file containing XML-converted RTF data': function(test) {
        test.expect(2);
        var count = fs.readdirSync('/tmp').length;

        doc.convertToXml('test/docs/rtf.rtf').
            then(function(text) {
                test.equal(text, '<?xml version="1.0" encoding="UTF-8"?>\n' +
                                 '<!DOCTYPE pdf2xml SYSTEM "pdf2xml.dtd">\n\n' +
                                 '<pdf2xml producer="poppler" version="0.24.5">\n' +
                                 '<page number="1" position="absolute" top="0" left="0" height="1188" width="918">\n' +
                                    '\t<fontspec id="0" size="16" family="Times" color="#000000"/>\n' +
                                 '<text top="86" left="85" width="406" height="20" font="0">' +
                                 'This is an rtf document. It was created with LibreOffice.</text>\n' +
                                 '</page>\n' +
                                 '</pdf2xml>\n');
                test.equal(count, fs.readdirSync('/tmp').length);
                test.done();
              }).
            catch(function(err) {
                console.log('err');
                console.log(err);
                test.ok(false, err);
                test.done();
              });
    },

    'Return XML when given a TXT': function(test) {
        test.expect(1);
        doc.convertToXml('test/docs/txt.txt').
            then(function(text) {
                test.equal(text, '<?xml version="1.0" encoding="UTF-8"?>\n' +
                                 '<!DOCTYPE pdf2xml SYSTEM "pdf2xml.dtd">\n\n' +
                                 '<pdf2xml producer="poppler" version="0.24.5">\n' +
                                 '<page number="1" position="absolute" top="0" left="0" height="1188" width="918">\n' +
                                    '\t<fontspec id="0" size="13" family="Times" color="#000000"/>\n' +
                                 '<text top="85" left="85" width="433" height="17" font="0">' +
                                 'This is a txt document. It was created with VIM.</text>\n' +
                                 '</page>\n' +
                                 '</pdf2xml>\n');
                test.done();
              }).
            catch(function(err) {
                console.log(err);
                test.ok(false, err);
                test.done();
              });
    },

//    'Start an unoconv listener if it\'s not already running': function(test) {
//        test.expect(3);
//        // Make sure unoconv is not running
//        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
//        exec(command, function(err, stdout, stderr) {
//            var unoconvPid = stdout;
//
//            // Make sure soffice.bin is not running
////            var command = 'ps ax | grep soffice.bin | grep -v grep | awk \'{print $1}\'';
////            exec(command, function(err, stdout, stderr) {
//
//                //command = 'kill ' + unoconvPid + ' ' + stdout;
//                command = 'kill ' + unoconvPid;
//                exec(command, function(err, stdout, stderr) {
//
//                    command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
//                    exec(command, function(err, stdout, stderr) {
//                        test.equal(stdout, '');
//    
//                        doc.convertToXml('test/docs/txt.txt').
//                            then(function(text) {
//                                command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
//                                exec(command, function(err, stdout, stderr) {
//                                    test.notEqual(stdout, '');
//                                    test.done();
//                                  });
//                              }).
//                            catch(function(err) {
//                                console.log(err);
//                                test.ok(false, err);
//                                test.done();
//                              });
//                      });
//            });
//          });
//    },
};

/**
 * startUnoconvListener
 *
 * This test is placed here so that a listener
 * will be running for the subsequent tests
 */
exports.startUnoconvListener = {

    // Make sure there's no unoconv listener running
    setUp: function(callback) {
        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
        exec(command, function(err, stdout, stderr) {
            command = 'kill ' + stdout;
            exec(command, function(err, stdout, stderr) {
                callback();
              });
          });
    },

    'Start an unoconv listener': function(test) {
        test.expect(2);
        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
        exec(command, function(err, stdout, stderr) {
            test.equal(stdout, '');

            doc.startUnoconvListener().
                then(function() {
                    test.ok(true);   
                    test.done();                       
                  }).
                catch(function(err) {
                    console.log(err);
                    test.ok(false);   
                    test.done();                       
                  });
          });
    },
};

/**
 * checkUnoconv
 */
exports.checkUnoconv = {

    // Make sure there's no unoconv listener or soffice.bin running
    setUp: function(callback) {
        var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
        exec(command, function(err, stdout, stderr) {
            var unoconvPid = stdout;

            // Get LibreOffice PID
            command = 'ps ax | grep soffice.bin | grep -v grep | awk \'{print $1}\''
            exec(command, function(err, stdout, stderr) {

                // Kill the processes
                command = 'kill ' + unoconvPid + ' ' + stdout;
                exec(command, function(err, stdout, stderr) {
                    callback();
                  });
              });
          });
    },

    'Start listener when necessary': function(test) {
        test.expect(3);
        // Verify that the listener is not running
        var unoconvCommand = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
        exec(unoconvCommand, function(err, stdout, stderr) {
            test.equal(stdout, '');

            // Verify that there is no soffice.bin running
            var sofficeCommand = 'ps ax | grep soffice.bin | grep -v grep | awk \'{print $1}\'';
            exec(sofficeCommand, function(err, stdout, stderr) {
                test.equal(stdout, '');

                doc.checkUnoconv().
                    then(function() {
                        exec(unoconvCommand, function(err, stdout, stderr) {
                            test.notEqual(stdout, '');   
                            test.done();
                          });
                      }).
                    catch(function(err) {
                        console.log(err);
                        test.ok(false);   
                        test.done();                       
                      });
              });
          });
    },

    'Don\'t restart listener if it\'s already running': function(test) {
        test.expect(2);
        doc.startUnoconvListener().
            then(function() {
                // Get the unoconv PID
                var command = 'ps ax | grep unoconv | grep -v grep | awk \'{print $1}\'';
                exec(command, function(err, stdout, stderr) {
                    var pid = stdout;
                    test.notEqual(pid, '');
 
                    doc.checkUnoconv().
                        then(function() {
                            // Ensure the PID is the same
                            // (otherwise a new instance was created)
                            exec(command, function(err, stdout, stderr) {
                                test.equal(pid, stdout);   
                                test.done();                       
                              });
                          }).
                        catch(function(err) {
                            console.log(err);
                            test.ok(false);   
                            test.done();                       
                          });
                  });
              }).
            catch(function(err) {
                console.log(err);
                test.ok(false);
                test.done();
              });
    },
};
