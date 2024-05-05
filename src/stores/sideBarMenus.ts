const userMenu = [
    {
        title: 'Dashboard',
        routeName: 'user-Dashboard',
        icon: 'bi bi-house'
    },
    {
        title: 'Messages',
        routeName: 'user-Messages',
        icon: 'bi bi-chat-square-text'
    },
    {
        title: 'Applied Jobs',
        routeName: 'user-Applied_Jobs',
        icon: 'bi bi-files'
    },
    {
        title: 'Find Jobs',
        routeName: 'user-Find_Jobs',
        icon: 'bi bi-search'
    },

    {
        title: 'Browse Companies',
        routeName: 'user-Browse_Companies',
        icon: 'bi bi-buildings'
    },

    {
        title: 'My Public Profile',
        routeName: 'user-Profile',
        icon: 'bi bi-person'
    },
]

const adminMenu = [{
    title: 'Dashboard',
    routeName: 'admin-Dashboard',
    icon: 'bi bi-house'
},
{
    title: 'Messages',
    routeName: 'admin-Messages',
    icon: 'bi bi-chat-square-text'
},
{
    title: 'Company Profile',
    routeName: 'admin-Company_Profile',
    icon: 'bi bi-buildings'
},
{
    title: 'Job Listing',
    routeName: 'admin-Job_Listing',
    icon: 'bi bi-journal-text'
},

{
    title: 'My Schedule',
    routeName: 'admin-Schedule',
    icon: 'bi bi-calendar-event'
},

]

const recruiterMenu = [{

}]

export {
    userMenu,
    recruiterMenu,
    adminMenu
}