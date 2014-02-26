gebo-docs
=========

A gebo-server module for document-to-text conversions

# Third-party requirements

This package has a butt-load of dependencies. It's tested on Ubuntu 12.04.
It'll probably work on other distributions, but the unit tests will
definitely break.

## LibreOffice 4.1.42

```
sudo add-apt-repository ppa:libreoffice/libreoffice-4-1
sudo apt-get update
sudo apt-get install libreoffice
```

## unoconv 0.6

The latest version available on Ubuntu repository is 0.5. As such, unoconv 0.6
must be cloned from GitHub and built locally.

```
apt-get remove --purge unoconv
git clone https://github.com/dagwieers/unoconv
cd unoconv
sudo make install
```

## poppler-utils 0.24.5

This allows you to retrieve XML-formatted document format data from
PDFs (with pdftohtml) and converts PDFs to plain text (with pdftotext).

Remove the current poppler-utility, if present:

```
sudo apt-get remove poppler-utils
```

Visit [http://poppler.freedesktop.org/](http://poppler.freedesktop.org/) to get a new and
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

## Et al

```
sudo apt-get install unzip
sudo apt-get install unrtf
sudo apt-get install odt2txt
sudo apt-get install docx2txt
sudo apt-get install catdoc
```

# Install

```
npm install gebo-docs
```

# Contributing

Hit me with it

# Licence

MIT

