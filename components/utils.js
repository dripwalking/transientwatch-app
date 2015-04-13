exports.htmlToString = function (str) { 
	return String(str).replace(/<p>/g, '\n\n').replace(/&#x2F;/g, '/').replace('<i>', '').replace('</i>', '').replace('<br/>', '').replace('<h2>', '').replace('</h2>', '').replace(/&#x27;/g, '\'').replace(/&quot;/g, '\"').replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)" rel="nofollow">(.*)?<\/a>/g, "$1");
};