/*eslint-disable no-self-compare*/

export const links = [
    {
        link: "/universe",
        name: "Univers"
    },
    {
        link: "/tag",
        name: "Tag"
    },
    {
        link: "/media",
        name: "Média"
    },
    {
        link: "/character",
        name: "Personnage"
    },
];
export const linksAdmin = [
    {
        link: "/universe",
        name: "Univers"
    },
    {
        link: "/tag",
        name: "Tag"
    },
    {
        link: "/studio",
        name: "Studio"
    },
    {
        link: "/episode",
        name: "Episode"
    },
    {
        link: "/media",
        name: "Média"
    },
    {
        link: "/character",
        name: "Personnage"
    },
    {
        link: "/voice-actor",
        name: "Voix"
    },
    {
        link: "/staff",
        name: "Staff"
    },
    {
        link: "/theme",
        name: "Theme"
    },
];

export const initTabsObject = (array) => {
    const result = {};
    array.forEach((e) => {
        result[e.key] = "";
    });
    return result;
}

export const tabsLanguagesTitle = [
    {displayName:"FR", key:"french"},
    {displayName:"EN", key:"english"},
    {displayName:"ROM", key:"romaji"}
];

export const tabsLanguages = [
    {displayName:"FR", key:"french"},
    {displayName:"EN", key:"english"}
];

export const mediaType = [
    {displayName:"Anime", key:"ANIME"},
    {displayName:"Manga", key:"MANGA"},
    {displayName:"Movie", key:"MOVIE"},
    {displayName:"OAV", key:"OAV"},
    {displayName:"Game", key:"GAME"},
    {displayName:"Webtoon", key:"WEBTOON"},
]

export const seasonalAiring = [
    {displayName:"Undefined", key:"UNDEFINED"},
    {displayName:"Winter", key:"WINTER"},
    {displayName:"Spring", key:"SPRING"},
    {displayName:"Summer", key:"SUMMER"},
    {displayName:"Fall", key:"FALL"},
]

export const genderList = [
    {displayName:"Undefined", key:"UNDEFINED"},
    {displayName:"Male", key:"MALE"},
    {displayName:"Female", key:"FEMALE"},
]

export const isValidDate = function (date) {

    if(date === null) return false;
    return date.getTime() === date.getTime();
};