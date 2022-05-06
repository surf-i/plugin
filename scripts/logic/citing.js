

/**
 * Function that returns an APA citation for a given page, given an author.
 *
 */
function citeAPA(authorName, authorLastname, websiteName, pageName, year, month, day, url)
{
    var formattedName = authorName[0]
    var pageName = pageName.italics()
    var cite = `${authorLastname}, ${formattedName}. (${year}, ${month} ${day}). ${pageName} ${websiteName}. ${url}`
    return cite
}

/**
 * Function that returns an APA citation for a given page, given a corporate/organization author.
 *
 */
function citeAPAOrganization(organizationName, year, month, day, pageName, url)
{
    var pageName = pageName.italics()
    var cite = `${organizationName}. (${year}, ${month} ${day}). ${pageName}. ${url}`
    return cite
}

/**
 * Function that returns an APA citation for a given page, given an unkwnown author.
 *
 */
function citeAPAUnknown(pageName, websiteName, year, month, day, url)
{
    var pageName = pageName.italics()
    var cite = `${pageName} ${websiteName}. (${year}, ${month} ${day}). ${url}`
    return cite
}