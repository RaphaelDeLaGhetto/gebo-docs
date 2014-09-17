This module is no longer maintained
===================================

You'll like [gebo-text-converter](https://github.com/RaphaelDeLaGhetto/gebo-text-converter) better.

gebo-docs
=========

A gebo-server module for document-to-text conversions

# Third-party requirements

This package has a butt-load of dependencies. It's tested on Ubuntu 12.04.
It'll probably work on other distributions, but the unit tests may break.

## poppler-utils 0.24.5

This enables you to convert PDFs to plain text (with pdftotext).

Remove the current poppler-utility, if present:

```
sudo apt-get remove poppler-utils
```

Visit [http://poppler.freedesktop.org/] to get a new and
stable version (the preferred version is poppler-0.24.5.tar.xz)

```
tar xvf poppler-0.24.5.tar.xz
```

Prep poppler-utils for compilation and installation:

```
cd poppler-0.24.5
./configure
```

If configure is stopped due to missing fontconfig, you need to install fontconfig:

```
sudo apt-get install libfontconfig1-dev
./configure
```

Compile the package:

```
sudo make
```

Install the programs, data files, and documentation:

```
sudo make install
```

Reboot the system:

```
sudo reboot
```

See if the programs were installed:

```
pdftohtml
```

If you see the following message:

```
error while loading shared libraries: libpoppler.so.44: cannot open shared object
file: No such file or directory
```

Run:

```
sudo cp /usr/local/lib/libpoppler.so.44 /usr/lib/
```

## docx2txt

Download the source and install manually from here: [http://sourceforge.net/projects/docx2txt/]

```
sudo apt-get install unzip
tar xvfz docx2txt-1.2.tgz
cd docx2txt-1.2/
sudo make
cd /usr/local/bin
sudo cp docx2txt.pl docx2txt
```

## Et al

```
sudo apt-get install unrtf
sudo apt-get install odt2txt
sudo apt-get install catdoc
```

# Install

```
npm install gebo-docs
```

# Usage

Do this if you're happy with the default configuration:

```
var doc = require('gebo-docs')();
```

Do this if you set your own third-party dependencies in gebo-docs.json (copy the file
provided into the desired directory and modify there):

```
var doc = require('gebo-docs')('/directory/in/which/config/file/is/contained');
```

Once required,

```
doc.convertToText('filename').
    then(text) {
        console.log(text); 
      }).
    catch(err) {
        // Something went wrong 
      });
```

# Contributing

Hit me with it

# Licence

MIT

