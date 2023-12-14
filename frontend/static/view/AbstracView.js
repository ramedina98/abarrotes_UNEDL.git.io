/* */
export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title + ' || Abarrotes UNEDL';
    }

    setIcon(iconURL){
        var link = document.querySelector('link[rel="icon"]');
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'icon');
            document.head.appendChild(link);
        }
        link.setAttribute('type', 'image/x-icon');
        link.setAttribute('href', iconURL);
    }

    async getHTML(){
        return ``;
    }
}