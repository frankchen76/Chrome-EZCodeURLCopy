// A generic onclick callback function.
function genericOnClick(info, tab) {
    //   console.log("item " + info.menuItemId + " was clicked");
    //   console.log("info: " + JSON.stringify(info));
    //   console.log("tab: " + JSON.stringify(tab));
    
    //generate a link content
    var linkContent = "<a href=\"" + info.pageUrl + "\">" + info.selectionText + "</a>";

    writeRichHtmlToClipboard(linkContent);
    console.log("copy to Clipboard");
}
function writeClipboard(str) {
    document.hasFocus = true;
    navigator.clipboard.writeText(str)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            // This can happen if the user denies clipboard permissions:
            //console.error('Could not copy text: ', err);
            alert(err);
        });
}

function writeTextToClipboard(str) {
    const elem = document.createElement('textarea')
    elem.value = str

    document.body.append(el)

    // Select the text and copy to clipboard
    elem.select()
    const success = document.execCommand('copy')
    elem.remove()
}

function writeRichHtmlToClipboard(str) {
    var element = document.body; 
    var elem = document.createElement('div');
    elem.innerHTML = str;
    document.body.append(elem);

    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(elem);
        range.select();
    }
    else if (window.getSelection) {
        // other browsers
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(elem);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    document.execCommand('copy');
    elem.remove();
}

// Create one test item for each context type.
// var contexts = ["page", "selection", "link", "editable", "image", "video",
//     "audio"];

//Create menu for the following contexts. 
var contexts = ["page", "selection", "link"];

for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "EZCodeURLCopy";
    var id = chrome.contextMenus.create({
        "title": title, 
        "contexts": [context],
        "onclick": genericOnClick
    });
    console.log("'" + context + "' item:" + id);
}
