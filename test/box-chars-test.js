describe('box-chars',function(){
  var chai = require('chai');
  var expect = chai.expect;

  var box = require('..');
  var light =box.LIGHT;
  var heavy = box.HEAVY;
  var nothing = box.NOTHING;
  var double = box.DOUBLE;

  it('every possible value of left, right, up, down should return a string of length 1',function(){
    var keys = [box.LIGHT, box.HEAVY, box.NOTHING, box.DOUBLE];
    keys.forEach(function(left){
      keys.forEach(function(right){
        keys.forEach(function(up){
          keys.forEach(function(down){
            var value = box(left, right, up, down);
            expect(value).to.be.a('string');
            expect(value.length).to.equal(1);
          });
        });
      });
    });
  });

  it('top-left corner',function(){
    expect(box(nothing,light,nothing,light)).to.equal('┌');
    expect(box(nothing,heavy,nothing,light)).to.equal('┍');
    expect(box(nothing,light,nothing,heavy)).to.equal('┎');
    expect(box(nothing,heavy,nothing,heavy)).to.equal('┏');
  });

  it('half length doubles are just converted to full length',function(){
     expect(box(double,nothing,nothing,nothing)).to.equal('═');
     expect(box(nothing,double,nothing,nothing)).to.equal('═');
     expect(box(nothing,nothing,double,nothing)).to.equal('║');
     expect(box(nothing,nothing,nothing,double)).to.equal('║');
  });

  it('double to single transitions are just doubles',function(){
    expect(box(double,light,nothing,nothing)).to.equal('═');
    expect(box(light,double,nothing,nothing)).to.equal('═');
    expect(box(nothing,nothing,double,light)).to.equal('║');
    expect(box(nothing,nothing,light,double)).to.equal('║');
    expect(box(double,heavy,nothing,nothing)).to.equal('═');
    expect(box(light,double,nothing,nothing)).to.equal('═');
    expect(box(nothing,nothing,double,light)).to.equal('║');
    expect(box(nothing,nothing,light,double)).to.equal('║');

    expect(box(double,light,double,light)).to.equal('╬');
    expect(box(double,light,light,light)).to.equal('╪');
    expect(box(double,heavy,light,light)).to.equal('╪');
  });

  it('double-dashed', function(){
    expect(box.doubleDash(false,false)).to.equal('╌');
    expect(box.doubleDash(false,true)).to.equal('╍');
    expect(box.doubleDash(true,false)).to.equal('╎');
    expect(box.doubleDash(true,true)).to.equal('╏');
    expect(box.dash('double',false,false)).to.equal('╌');
    expect(box.dash('double',false,true)).to.equal('╍');
    expect(box.dash('double',true,false)).to.equal('╎');
    expect(box.dash('double',true,true)).to.equal('╏');
  });

  it('triple-dashed', function(){
    expect(box.tripleDash(false,false)).to.equal('┄');
    expect(box.tripleDash(false,true)).to.equal('┅');
    expect(box.tripleDash(true,false)).to.equal('┆');
    expect(box.tripleDash(true,true)).to.equal('┇');
    expect(box.dash('triple',false,false)).to.equal('┄');
    expect(box.dash('triple',false,true)).to.equal('┅');
    expect(box.dash('triple',true,false)).to.equal('┆');
    expect(box.dash('triple',true,true)).to.equal('┇');
  });

  it('quad-dashed', function(){
    expect(box.quadDash(false,false)).to.equal('┈');
    expect(box.quadDash(false,true)).to.equal('┉');
    expect(box.quadDash(true,false)).to.equal('┊');
    expect(box.quadDash(true,true)).to.equal('┋');
    expect(box.dash('quad',false,false)).to.equal('┈');
    expect(box.dash('quad',false,true)).to.equal('┉');
    expect(box.dash('quad',true,false)).to.equal('┊');
    expect(box.dash('quad',true,true)).to.equal('┋');
  });

  it('slash',function(){
    expect(box.slash(false,false)).to.equal(' ');
    expect(box.slash(true,false)).to.equal('╱');
    expect(box.slash(false,true)).to.equal('╲');
    expect(box.slash(true,true)).to.equal('╳');
  });

  it('rounded',function(){
    expect(box.rounded(false,false)).to.equal('╯');
    expect(box.rounded(true,false)).to.equal('╮');
    expect(box.rounded(false,true)).to.equal('╰');
    expect(box.rounded(true,true)).to.equal('╭');
  });

});