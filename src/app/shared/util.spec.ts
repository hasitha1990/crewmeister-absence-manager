import { getDate, getDateString, getTime } from "./util";

describe('Test Util Methods', () =>{

  it('get time from datetime string', async () => {
    let gt = getTime;
    expect(gt('2021-06-30T02:13:56.000+02:00')).toBe(1625012036000);
  });

  it('get date string from datetime string', async () => {
    let gds = getDateString;
    expect(gds('2021-06-30T02:13:56.000+02:00')).toBe('2021-06-30');
  });
});
