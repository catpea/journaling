# journaling
Journaling Storage Engine

## Theory Of Operation

Json document with an array of paragraphs of multtiple types, is edited by JSONPatch objects that are first saved in a journal directory. The journal directory is contained within the directory that holds the content.json file. Name of the main directory is the record id. The patch files in the journal directory are uuid named, so that all save requests go thorugh.
