export const UserRole = {
    Admin: 'SUPER',
    Editor: 'USER',
  };

export const adminRoot = '/app';
export const searchPath = `${adminRoot}/#`;
export const addCart = '/detailCart';
export const checkout = '/detailCart/address/:subtotal/:costoEnvio/:total/:cuponDescuento';
export const myorders = '/myOrders';

// export const currentUser = {
//     id: 1,
//     title: 'Sarah Kortney',
//     img: '/assets/img/profiles/l-1.jpg',
//     date: 'Last seen today 15:24',
//     role: UserRole.Admin,
//   };
export const isAuthGuardActive = true;


export const urlBase = 'https://egoi.xyz/api/v1';
export const urlBase2= 'https://egoi.xyz/api/v2';
