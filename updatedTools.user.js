// ==UserScript==
// @name         [Functional] Improved Tools Menu
// @namespace    http://tampermonkey.net/
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uhaul.net
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function injectCSS(css) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    const CSSToInject = `
        .toolsNew {
            background: #e7e7e7;
            padding: 5px;
            border-radius: 5px;
        }
	`;
    injectCSS(CSSToInject);

    let wasUpdated = false
    function Execute() {
        const BaseURL = window.location.href

        if (BaseURL == "https://uhaul.net/tools/" && wasUpdated == false) {
            wasUpdated = true
            const ToolsBar = $("#MainBodyPlaceHolder_ToolsMenuDiv")

            ToolsBar.find("> div").each(function(index, element){
                $(element).find("> div").each(function(index2, item) {
                    const oldItem = $(item)
                    const redirectLink = oldItem.find("a").attr('href');
                    const image = oldItem.find("img").attr('src');
                    const text = oldItem.find("a:nth-child(2)").text()

                    const newItem = $(`
                    <div class="columns large-12" style="white-space: nowrap; padding: 0.5em 0.5em;">
                        <div class="toolsNew">
                            <a href="${redirectLink}">
                                <img src="${image}" alt="" border="0" align="middle" height="34" width="35">
                            </a>

                            &nbsp;&nbsp;

                            <a href="${redirectLink}">${text}</a>
                        </div>
                    </div>
                    `)

                    oldItem.hide()
                    newItem.show()

                    $(element).append(newItem)
                })
            })
        }
    }

    function Interval() {
        setInterval(() => {
            Execute()
        }, 100);
    }

    Interval();
})();
