
import {Bombo} from '../bombo.js';

describe('Generate bingo bombo', () => {
  //mock para que funcione
  document.body.innerHTML =
  '<div>' +
  '  <div id="balls" />' +
  '  <div id="caja" />' +
  '</div>';

  let bombo = new Bombo(document.getElementById('balls'),document.getElementById('caja'));  
  
  test('Not number extracted yet', () => {
    expect(bombo.getExtractedNumbers().length).toEqual(0)
  });
  test('90 balls', () => {
    expect(bombo.getRemainingBoles().length).toEqual(90)
  });
  
  test('One ball extracted', () => {
    bombo.pickNumber();  
    expect(bombo.getExtractedNumbers().length).toEqual(1)
    expect(bombo.getRemainingBoles().length).toEqual(89)
  });

  test('Numbers between 1 and 90', () => {
    let bombo = new Bombo(document.getElementById('balls'),document.getElementById('caja'));  
    let num=bombo.pickNumber();
    do{        
        expect((num>=1 & num<=90)).toBeTruthy();
        num=bombo.pickNumber()
    }while(num!=false); 
    
  });

  test('Not duplicates', () => {
    let bombo = new Bombo(document.getElementById('balls'),document.getElementById('caja'));  
    let extracted=[]
    let num=bombo.pickNumber();    
    do{                
        extracted.push(num);
        num=bombo.pickNumber();        
    }while(num!=false); 
    expect(!hasDuplicates(extracted)).toBeTruthy();
  });



})

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}