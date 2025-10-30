export const COLORS = {
  // Bảng màu Minecraft
  dirtBrown: '#8B4513',   // Nâu của đất
  grassGreen: '#55AC20',  // Xanh của cỏ
  stoneGray: '#808080',   // Xám của đá
  diamondBlue: '#33E9F4', // Xanh kim cương
  woodBrown: '#A0522D',   // Nâu của gỗ
  dangerRed: '#C02020',   // Đỏ của TNT
  
  white: '#FFFFFF',
  black: '#000000',
  

  transparentBlack: 'rgba(0, 0, 0, 0.5)', 
  transparentWhite: 'rgba(255, 255, 255, 0.1)',
  placeholder: 'rgba(255, 255, 255, 0.4)',
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 0, 
  padding: 20,
  
  h1: 30,
  h2: 24,
  h3: 18,
  body: 16,
};

export const FONTS = {
   
    minecraftBold: 'Mine_Bold',
    minecraftRegular: 'Mine_regu',

 
    h1: { fontFamily: 'Mine_Bold', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: 'Mine_Bold', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: 'Mine_Bold', fontSize: SIZES.h3, lineHeight: 22 },
    body: { fontFamily: 'Mine_regu', fontSize: SIZES.body, lineHeight: 20 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;