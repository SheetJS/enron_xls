# Enron Spreadsheet Corpus

The [Enron Corpus](https://en.wikipedia.org/wiki/Enron_Corpus) is a massive
database of emails amassed in the investigation of the former Enron Corporation.
The original corpus is available as a series of PST email archives.  The emails
include tens of thousands of spreadsheets.

The original dataset included personally identifiable information such as birth
dates and Social Security numbers.  [Nuix](https://www.nuix.com/) produced a
cleaner dataset and makes it available to the community.

The spreadsheets in this dataset are in their original format, including BIFF2,
TSV, semicolon-delimited values, SYLK, and HTML files saved as XLS.  To avoid
name collisions, the file names follow the pattern `${PST_NAME}.${INDEX}.xls`.


## Methodology

Starting from the cleaned email set, each PST file was downloaded and processed
using the excellent [`pst-extractor`](https://npm.im/pst-extractor) Node module.

Every available XLS attachment (these emails predate XLSX, which was introduced
in 2007) was extracted, and the files were de-duplicated based on MD5 checksum.


## References

- <https://www.edrm.net/resources/data-sets/edrm-enron-email-data-set/>
- <http://info.nuix.com/Enron.html>

[![Analytics](https://ga-beacon.appspot.com/UA-36810333-1/SheetJS/enron_xls?pixel)](https://github.com/SheetJS/enron_xls)
