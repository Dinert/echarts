import _ from 'lodash'

/**
 * 获取唯一ID
 * @returns String
 */
 export const getUuid = () => {
  var s = []
  var hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  let uuid = s.join('')
  return uuid
}

/**
 * 
 * @param {Function} resize 
 * @param {Number} delay 
 * @param {Boolean} immediate 
 */
export const resize = (resize, delay = 0, immediate = false) => {
  if (typeof resize === 'function') {
    window.addEventListener('resize', _.debounce(resize, delay), immediate)
    resize()
  }
}