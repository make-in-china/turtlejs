
/**
 * 可躲过一些js压缩库console.log;
 */
let log=Function('s','console.log(s)');

/**
 * 可躲过一些js压缩库debugger;
 */
let bp=Function('debugger');
