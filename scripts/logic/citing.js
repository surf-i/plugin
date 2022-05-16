

/**
 * Function that returns an APA citation for a given page, given an author.
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
  */
 function citeAPAUnknown(pageName, websiteName, year, month, day, url)
 {
     var pageName = pageName.italics()
     var cite = `${pageName} ${websiteName}. (${year}, ${month} ${day}). ${url}`
     return cite
 }
 
 
 /**
  * Function that returns an IEEE citation for a given page, given an author.
  */
 function citeIEEE(authorName, authorLastname, websiteName, pageName, currentYear, currentMonth, currentDay, url)
 {
     var formattedName = authorName[0]
     var cite = `${formattedName}. ${authorLastname}, "${pageName}" ${websiteName}. ${url} (accessed ${currentMonth}. ${currentDay}, ${currentYear}).`
     return cite
 }
 
 
 /**
  * Function that returns an IEEE citation for a given page, given an organization author.
  */
 function citeIEEEOrganization(organizationName, websiteName, pageName, currentYear, currentMonth, currentDay, url)
 {
     var pageName = pageName.italics()
     var cite = `${organizationName}, "${pageName}." ${websiteName}. ${url} (accessed ${currentMonth}. ${currentDay}, ${currentYear}).`
     return cite
 }
 
 /**
  * Function that returns an IEEE citation for a given page, given an unknown author.
  */
 function citeIEEEUnknown(pageName, currentYear, currentMonth, currentDay, url)
 {
     var pageName = pageName.italics()
     var cite = `"${pageName}." Accessed on: ${currentMonth}, ${currentDay}, ${currentYear}. [Online] Available: ${url}`
     return cite
 }
 
 function citeChicago(authorName, authorLastname, websiteName, pageName, year, month, day, url)
 {
     return `${authorLastname}, ${authorName}. "${pageName}". ${websiteName} ${month}. ${day}, ${year}. ${url}.`
 }
 
 function citeChicagoOrganization(organizationName, websiteName, pageName, year, month, day, url)
 {
     return `${organizationName}. "${pageName}". ${websiteName} ${month} ${day}, ${year}. ${url}.`
 }
 
 function citeChicagoUnknown(pageName, websiteName, year, month, day, url)
 {
     return `"${pageName}". ${websiteName} ${month} ${day}, ${year}. ${url}.`
 }
 
 export {citeAPA, citeAPAOrganization, citeAPAUnknown, 
         citeIEEE, citeIEEEOrganization, citeIEEEUnknown, 
         citeChicago, citeChicagoOrganization, citeChicagoUnknown}