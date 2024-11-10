const ip = `localhost`;
const port = `3001`;
const baseUrl = `http://${ip}:${port}/ghost`

export const config = {
    loginPage: {
        url: `${baseUrl}/#/signin`
    },

    membersPage: {
        url: `${baseUrl}/#/members`
    }
}