# Enron Spreadsheet Corpus

The [Enron Corpus](https://en.wikipedia.org/wiki/Enron_Corpus) is a massive
database of emails amassed in the investigation of the former Enron Corporation.
The original corpus is available as a series of PST email archives.  The emails
include tens of thousands of spreadsheets.

Various sources point to the existence of a version of the dataset with all
attachments.  Those links have been removed but the dataset was preserved on the
[Internet Archive](https://archive.org/details/edrm.enron.email.data.set.v2.xml)

The original dataset included personally identifiable information such as birth
dates and Social Security numbers.  [Nuix](https://www.nuix.com/) produced a
cleaner dataset and made it available to the community.  Unfortunately this
dataset was removed.

The spreadsheets in this dataset are in their original format, including BIFF2,
TSV, semicolon-delimited values, SYLK, and HTML files saved as XLS.  They have
been de-duplicated by MD5 hash.

## Files

- EDRM Dataset: [edrm/](edrm/)

- Nuix modified: [nuix/](nuix/)

## Methodology

### EDRM Dataset

The included <parse.mjs> script runs in NodeJS 16 and automates the process of
downloading the spreadsheets from the archive.

The actual dataset is a series of ZIP files.  It is possible to cherry-pick from
the ZIP archives without having to download the entire 74 GB archive.

### Nuix Dataset

Starting from the cleaned email set, each PST file was downloaded and processed
using the excellent [`pst-extractor`](https://npm.im/pst-extractor) Node module.

Every available XLS attachment (these emails predate XLSX, which was introduced
in 2007) was extracted, and the files were de-duplicated based on MD5 checksum.

Any duplicates of files in the EDRM set were removed.

## References

- <https://www.edrm.net/resources/data-sets/edrm-enron-email-data-set/>
- <http://info.nuix.com/Enron.html>

[![Analytics](https://ga-beacon.appspot.com/UA-36810333-1/SheetJS/enron_xls?pixel)](https://github.com/SheetJS/enron_xls)
