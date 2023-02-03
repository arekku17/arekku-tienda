
let menuItemslet = [
    {
        title: 'Productos',
        url: '/productos',
    },
    {
        title: 'Por Anime',
        url: '/xanime',
        submenu: [
            {
                slug: "productos/hunterxhunter/",
                anchor: "Hunter x Hunter",
            },
            {
                slug: "productos/csm/",
                anchor: "Chainsaw Man",
            },
            {
                slug: "productos/demonslayer/",
                anchor: "Demon Slayer",
            },
        ],
    },
];

export const menuItems = menuItemslet;
