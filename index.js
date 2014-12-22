//http://en.wikipedia.org/wiki/Box-drawing_character


//CONSTANTS
var nothing = 0;     //no line in the given direction
var light = 1;       //a light line in the given direction
var heavy = 2;       //a heavy line in the given direction
var single = 4;      //a single line in the given direction - will be added as both heavy and light
var double = 3;      //a double line in the given direction

var cache = [' '];
var addedChars = {};

function computeKey(left, right, up, down){
  return (left << 6) | (right << 4) | (up <<2) | down;
}

function put(charCode, left, right, up, down, allowDuplicate){
  for(var i = 1; i <= 5; i++){
    // when single and double lines intersect, there is no option for either to be "heavy" or "light".
    // We add one entry for both heavy and light, that way edges intersecting with double lines won't have to
    // perform checks.
    if(arguments[i] == single){
      var args = Array.prototype.slice.apply(arguments);
      args.push(true);
      args[i] = light;
      put.apply(null,args);
      args[i] = heavy;
      put.apply(null,args);
      return;
    }
  }
  var key = computeKey(left, right, up, down);
  var value = String.fromCharCode(charCode);

  if(cache[key] && cache[key] !== value){
    throw new Error([left,right,up,down].join(','));
  }

  if(addedChars[value] && !allowDuplicate){
    throw new Error(value + '(' + value.charCodeAt(0) + ') added twice ' + allowDuplicate);
  }
  addedChars[value] = true;

  cache[key]  = value;

  if(left == double && right == double){
    put(charCode, single, double, up, down, true);
    put(charCode, double, single, up, down, true);
  }
  if(up == double && down == double){
    put(charCode, left, right, single, double, true);
    put(charCode, left, right, double, single, true);
  }
}

function lookup(left, right, up, down){
  return cache[computeKey(left, right, up, down)];
}

function dash(type, vertical, heavy){
  switch (type){
    case 'triple':
      return vertical ? heavy ? '┇' : '┆' : heavy ? '┅' : '┄';
    case 'quad':
      return vertical ? heavy ? '┋' : '┊' : heavy ? '┉' : '┈';
    default :
      return vertical ? heavy ? '╏' : '╎' : heavy ? '╍' : '╌';
  }
}

function slash(forward,backward){
  return forward ? backward ? '╳' : '╱' : backward ? '╲' : ' ';
}

function rounded(top,left){
  return top ? left ? '╭' : '╮' : left ? '╰' : '╯';
}

lookup.slash = slash;
lookup.dash = dash;
lookup.rounded = rounded;
lookup.quadDash = dash.bind(null,'quad');
lookup.tripleDash = dash.bind(null,'triple');
lookup.doubleDash = dash.bind(null,'double');

Object.defineProperties(lookup,{
  LIGHT:{value:light,enumerable:true},
  HEAVY:{value:heavy,enumerable:true},
  DOUBLE:{value:double,enumerable:true},
  SINGLE:{value:light},
  NOTHING:{value:nothing,enumerable:true}
});

module.exports = lookup;

put(0x2500, light, light, nothing, nothing); //solid lines
put(0x2501, heavy, heavy, nothing, nothing);
put(0x2502, nothing, nothing, light, light);
put(0x2503, nothing, nothing, heavy, heavy);

//2504 through 250B are triple dashed lines.

put(0x250C, nothing, light, nothing, light); //top-left
put(0x250D, nothing, heavy, nothing, light);
put(0x250E, nothing, light, nothing, heavy);
put(0x250F, nothing, heavy, nothing, heavy);

put(0x2510, light, nothing, nothing, light); //top-right
put(0x2511, heavy, nothing, nothing, light);
put(0x2512, light, nothing, nothing, heavy);
put(0x2513, heavy, nothing, nothing, heavy);

put(0x2514, nothing, light, light, nothing); //bottom-left
put(0x2515, nothing, heavy, light, nothing);
put(0x2516, nothing, light, heavy, nothing);
put(0x2517, nothing, heavy, heavy, nothing);

put(0x2518, light, nothing, light, nothing); //bottom-right
put(0x2519, heavy, nothing, light, nothing);
put(0x251A, light, nothing, heavy, nothing);
put(0x251B, heavy, nothing, heavy, nothing);

put(0x251C, nothing, light, light, light); //mid-left
put(0x251D, nothing, heavy, light, light);
put(0x251E, nothing, light, heavy, light);
put(0x251F, nothing, light, light, heavy);
put(0x2520, nothing, light, heavy, heavy);
put(0x2521, nothing, heavy, heavy, light);
put(0x2522, nothing, heavy, light, heavy);
put(0x2523, nothing, heavy, heavy, heavy);

put(0x2524, light, nothing, light, light); //mid-right
put(0x2525, heavy, nothing, light, light);
put(0x2526, light, nothing, heavy, light);
put(0x2527, light, nothing, light, heavy);
put(0x2528, light, nothing, heavy, heavy);
put(0x2529, heavy, nothing, heavy, light);
put(0x252A, heavy, nothing, light, heavy);
put(0x252B, heavy, nothing, heavy, heavy);

put(0x252C, light, light, nothing, light); //top-mid
put(0x252D, heavy, light, nothing, light);
put(0x252E, light, heavy, nothing, light);
put(0x252F, heavy, heavy, nothing, light);
put(0x2530, light, light, nothing, heavy);
put(0x2531, heavy, light, nothing, heavy);
put(0x2532, light, heavy, nothing, heavy);
put(0x2533, heavy, heavy, nothing, heavy);

put(0x2534, light, light, light, nothing); //bottom-mid
put(0x2535, heavy, light, light, nothing);
put(0x2536, light, heavy, light, nothing);
put(0x2537, heavy, heavy, light, nothing);
put(0x2538, light, light, heavy, nothing);
put(0x2539, heavy, light, heavy, nothing);
put(0x253A, light, heavy, heavy, nothing);
put(0x253B, heavy, heavy, heavy, nothing);

put(0x253C, light, light, light, light); //mid-mid
put(0x253D, heavy, light, light, light);
put(0x253E, light, heavy, light, light);
put(0x253F, heavy, heavy, light, light);
put(0x2540, light, light, heavy, light);
put(0x2541, light, light, light, heavy);
put(0x2542, light, light, heavy, heavy);
put(0x2543, heavy, light, heavy, light);
put(0x2544, light, heavy, heavy, light);
put(0x2545, heavy, light, light, heavy);
put(0x2546, light, heavy, light, heavy);
put(0x2547, heavy, heavy, heavy, light);
put(0x2548, heavy, heavy, light, heavy);
put(0x2549, heavy, light, heavy, heavy);
put(0x254A, light, heavy, heavy, heavy);
put(0x254B, heavy, heavy, heavy, heavy);

//254C -- 254F are double dashed lines

put(0x2550, double, double, nothing, nothing);  //straight lines
put(0x2551, nothing, nothing, double, double);

put(0x2552, nothing, double, nothing, single);  //top-left
put(0x2553, nothing, single, nothing, double);
put(0x2554, nothing, double, nothing, double);

put(0x2555, double, nothing, nothing, single);  //top-right
put(0x2556, single, nothing, nothing, double);
put(0x2557, double, nothing, nothing, double);

put(0x2558, nothing, single, double, nothing);  //bottom-left
put(0x2559, nothing, double, single, nothing);
put(0x255A, nothing, double, double, nothing);

put(0x255B, double, nothing, single, nothing);  //bottom-right
put(0x255C, single, nothing, double, nothing);
put(0x255D, double, nothing, double, nothing);

put(0x255E, nothing, double, single, single); //mid-left
put(0x255F, nothing, single, double, double);
put(0x2560, nothing, double, double, double);

put(0x2561, double, nothing, single, single); //mid-right
put(0x2562, single, nothing, double, double);
put(0x2563, double, nothing, double, double);

put(0x2564, double, double, nothing, single); //top-mid
put(0x2565, single, single, nothing, double);
put(0x2566, double, double, nothing, double);

put(0x2567, double, double, single, nothing); //bottom-mid
put(0x2568, single, single, double, nothing);
put(0x2569, double, double, double, nothing);

put(0x256A, double, double, single, single); //mid-mid
put(0x256B, single, single, double, double);
put(0x256C, double, double, double, double);

//256D - 2570 are rounded corners
//2571 - 2573 are diagonal lines

put(0x2574, light, nothing, nothing, nothing); //half-lines
put(0x2575, nothing, nothing, light, nothing);
put(0x2576, nothing, light, nothing, nothing);
put(0x2577, nothing, nothing, nothing, light);
put(0x2578, heavy, nothing, nothing, nothing);
put(0x2579, nothing, nothing, heavy, nothing);
put(0x257A, nothing, heavy, nothing, nothing);
put(0x257B, nothing, nothing, nothing, heavy);

put(0x257C, light, heavy, nothing, nothing); //transition-lines
put(0x257D, nothing, nothing, light, heavy);
put(0x257E, heavy, light, nothing, nothing);
put(0x257F, nothing, nothing, heavy, light);

// Half length doubles don't exist, so just return full length
cache[computeKey(double,nothing,nothing,nothing)]=lookup(double,double,nothing,nothing);
cache[computeKey(nothing,double,nothing,nothing)]=lookup(double,double,nothing,nothing);
cache[computeKey(nothing,nothing,double,nothing)]=lookup(nothing,nothing,double,double);
cache[computeKey(nothing,nothing,nothing,double)]=lookup(nothing,nothing,double,double);
