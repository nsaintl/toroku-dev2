

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
    {displayName:"Winter", key:"WINTER"},
    {displayName:"Spring", key:"SPRING"},
    {displayName:"Summer", key:"SUMMER"},
    {displayName:"Fall", key:"FALL"},
]

export const genderList = [
    {displayName:"Male", key:"FEMALE"},
    {displayName:"Female", key:"MALE"},
]

export const isValid = function (date) {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return date.getTime() === date.getTime();
};