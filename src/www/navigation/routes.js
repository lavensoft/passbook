export const routes = {
    HOME: '/',
    QR_SCAN: '/qr_scan',
    SETTINGS: '/settings',
    PRODUCT: {
        CREATE: '/product/create',
        MARKET: '/products',
        INFORMATION: {
            TICKET: '/tickets/:ticketId',
            ITEM: '/items/:itemId',
        },
        CATEGORY: {
            OWNED: '/products/categories/owned/:categoryId',
            LIST: '/products/categories/:categoryId',
        },
        EXCHANGE: '/exchange/:ticketId'
    },
    PROFILE: '/users/:principalId',
    PERMISSION: {
        PERMISSION: '/permission',
        USERDETAIL: '/user-detail/:userId',
        ADDUSER: '/user/add-user',
    }
};