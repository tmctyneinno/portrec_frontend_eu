import Iconsjs from 'bootstrap-icons/font/bootstrap-icons.css?inline'

function extractStrings(inputString: string, startChar: string, endChar: string) {
    // Create a regular expression pattern dynamically
    const regexPattern = new RegExp(startChar + '.*?' + endChar, 'g');

    // Use the match method with the regular expression to find all matching strings
    const matchedStrings: any = inputString.match(regexPattern);
    const newStrings = [];
    for (const string of matchedStrings) {
        const replace1 = string.replace(/::$/, "");
        const replace2 = replace1.replace(/]$/, "");
        newStrings.push(replace2);
    }

    // Return the array of matched strings
    return newStrings;
}

const extractedStrings: any = extractStrings(Iconsjs, '.bi-', '::')
const bsIcons = extractedStrings.slice(2)

export {
    bsIcons
}