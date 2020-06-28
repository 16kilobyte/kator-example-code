# Metadata Extractor Challenge

## Description

The challenge is to build a metadata extractor for all the project Gutenberg titles which are available in [zip](http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip) and [tar](http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.bz2) format

Each book has an RDF file which will need to be processed to extract the:

- id (will be a number with 0-5 digits)
- title
- author/s
- publisher (value will always be Gutenberg)
- publication date
- language
- subject/s
- license rights

    *Note: For some books all of the data won't be available.*

### Tasks

- Write a function that reads a single file in and outputs the correct output, using something
like ​[xml2js](https://www.npmjs.com/package/xml2js) ​ or [xmldom](https://www.npmjs.com/package/xmldom) ​will probably be useful to read the rdf files
- Store the output in a database of your choice locally for later querying, perhaps something
like ​[sequelize](https://github.com/sequelize/sequelize​) with MySQL/PostGreSQL or use something else!
- Write unit tests in a testing framework like mocha or jest for the code, ensuring that coverage information is saved
- Run the function against all the rdf files
- Send through the code once you're done, ensuring that if you create a github repo the name is simply your name concatenated with "example-code" if using with your test coverage analysis file

## Usage

```sh
git clone git@github.com:16kilobyte/kator-example-code.git
cd kator-example-code && npm install
```

After downloading and extracting the Gutenberg project titles from [here](http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip), you can run the following command to index the titles

```sh
npm start -- --index [unzipped-dir]
```
where `unzipped-directory` is the `epub` directory in the archive. For example, mine was `npm start -- --index /Users/kator/Downloads/cache/epub/`

## Assumptions

- Different authors can have the same name. I could have gone with a more normalized schema where we have the authors tables and another table for `n-m` mapping but I figured since we are not extracting the `authorId`, this may be too redundant.
- Because of the above, the solutions assumes there won't be need to retrieve a unique authors publications.
- The solutions assumes that publisher is always Gutenberg and therefore makes not attempts to retrieve or store it
- The solution assumes there won't be need for indexing a book without a `title` nor `id`.

## Improvements

This solution can be further improved on in the following ways
- We could go with a normalized db schema for better scalability. Although is is at the expense of some read speed.
- We could implement a queue for parsing the files. We could divide the load into `os.cpus().length` queues and spin up different slave processes with the `cluster` and `child_process` modules to handle each queue in parallel. This may cut our indexing time by a lot.
- Instead of dropping the schema on each run, we could check if book has already been indexed and skip other wise. Another thing to do is to keep a hash of the each book and update the book only when it changes

