/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 9.0, "minX": 0.0, "maxY": 4700.0, "series": [{"data": [[0.0, 9.0], [0.1, 11.0], [0.2, 12.0], [0.3, 12.0], [0.4, 13.0], [0.5, 13.0], [0.6, 14.0], [0.7, 14.0], [0.8, 15.0], [0.9, 15.0], [1.0, 16.0], [1.1, 16.0], [1.2, 17.0], [1.3, 17.0], [1.4, 18.0], [1.5, 18.0], [1.6, 19.0], [1.7, 19.0], [1.8, 20.0], [1.9, 20.0], [2.0, 21.0], [2.1, 21.0], [2.2, 21.0], [2.3, 22.0], [2.4, 22.0], [2.5, 23.0], [2.6, 23.0], [2.7, 24.0], [2.8, 24.0], [2.9, 25.0], [3.0, 25.0], [3.1, 25.0], [3.2, 26.0], [3.3, 26.0], [3.4, 27.0], [3.5, 27.0], [3.6, 27.0], [3.7, 28.0], [3.8, 28.0], [3.9, 29.0], [4.0, 29.0], [4.1, 29.0], [4.2, 30.0], [4.3, 30.0], [4.4, 31.0], [4.5, 31.0], [4.6, 32.0], [4.7, 32.0], [4.8, 33.0], [4.9, 33.0], [5.0, 34.0], [5.1, 34.0], [5.2, 35.0], [5.3, 35.0], [5.4, 36.0], [5.5, 36.0], [5.6, 36.0], [5.7, 37.0], [5.8, 37.0], [5.9, 38.0], [6.0, 38.0], [6.1, 39.0], [6.2, 39.0], [6.3, 40.0], [6.4, 40.0], [6.5, 40.0], [6.6, 41.0], [6.7, 41.0], [6.8, 42.0], [6.9, 42.0], [7.0, 43.0], [7.1, 43.0], [7.2, 43.0], [7.3, 44.0], [7.4, 44.0], [7.5, 45.0], [7.6, 45.0], [7.7, 46.0], [7.8, 46.0], [7.9, 47.0], [8.0, 47.0], [8.1, 47.0], [8.2, 48.0], [8.3, 49.0], [8.4, 49.0], [8.5, 50.0], [8.6, 50.0], [8.7, 51.0], [8.8, 51.0], [8.9, 51.0], [9.0, 52.0], [9.1, 53.0], [9.2, 53.0], [9.3, 54.0], [9.4, 54.0], [9.5, 55.0], [9.6, 55.0], [9.7, 55.0], [9.8, 56.0], [9.9, 56.0], [10.0, 57.0], [10.1, 58.0], [10.2, 58.0], [10.3, 58.0], [10.4, 59.0], [10.5, 59.0], [10.6, 60.0], [10.7, 60.0], [10.8, 61.0], [10.9, 61.0], [11.0, 62.0], [11.1, 62.0], [11.2, 62.0], [11.3, 63.0], [11.4, 63.0], [11.5, 64.0], [11.6, 64.0], [11.7, 64.0], [11.8, 65.0], [11.9, 65.0], [12.0, 66.0], [12.1, 66.0], [12.2, 66.0], [12.3, 67.0], [12.4, 67.0], [12.5, 67.0], [12.6, 68.0], [12.7, 68.0], [12.8, 69.0], [12.9, 69.0], [13.0, 69.0], [13.1, 70.0], [13.2, 70.0], [13.3, 71.0], [13.4, 71.0], [13.5, 72.0], [13.6, 72.0], [13.7, 72.0], [13.8, 73.0], [13.9, 73.0], [14.0, 74.0], [14.1, 74.0], [14.2, 74.0], [14.3, 75.0], [14.4, 75.0], [14.5, 75.0], [14.6, 76.0], [14.7, 76.0], [14.8, 77.0], [14.9, 77.0], [15.0, 78.0], [15.1, 78.0], [15.2, 79.0], [15.3, 79.0], [15.4, 79.0], [15.5, 80.0], [15.6, 80.0], [15.7, 81.0], [15.8, 81.0], [15.9, 81.0], [16.0, 82.0], [16.1, 82.0], [16.2, 83.0], [16.3, 83.0], [16.4, 84.0], [16.5, 84.0], [16.6, 84.0], [16.7, 85.0], [16.8, 85.0], [16.9, 85.0], [17.0, 86.0], [17.1, 86.0], [17.2, 87.0], [17.3, 87.0], [17.4, 87.0], [17.5, 88.0], [17.6, 88.0], [17.7, 89.0], [17.8, 89.0], [17.9, 89.0], [18.0, 90.0], [18.1, 90.0], [18.2, 91.0], [18.3, 91.0], [18.4, 91.0], [18.5, 92.0], [18.6, 92.0], [18.7, 92.0], [18.8, 93.0], [18.9, 93.0], [19.0, 94.0], [19.1, 94.0], [19.2, 95.0], [19.3, 95.0], [19.4, 96.0], [19.5, 96.0], [19.6, 97.0], [19.7, 97.0], [19.8, 98.0], [19.9, 98.0], [20.0, 99.0], [20.1, 99.0], [20.2, 100.0], [20.3, 100.0], [20.4, 100.0], [20.5, 101.0], [20.6, 101.0], [20.7, 102.0], [20.8, 102.0], [20.9, 103.0], [21.0, 103.0], [21.1, 104.0], [21.2, 104.0], [21.3, 105.0], [21.4, 105.0], [21.5, 106.0], [21.6, 106.0], [21.7, 107.0], [21.8, 107.0], [21.9, 108.0], [22.0, 108.0], [22.1, 108.0], [22.2, 109.0], [22.3, 109.0], [22.4, 110.0], [22.5, 110.0], [22.6, 111.0], [22.7, 111.0], [22.8, 112.0], [22.9, 112.0], [23.0, 112.0], [23.1, 113.0], [23.2, 113.0], [23.3, 114.0], [23.4, 115.0], [23.5, 115.0], [23.6, 115.0], [23.7, 116.0], [23.8, 116.0], [23.9, 117.0], [24.0, 117.0], [24.1, 118.0], [24.2, 118.0], [24.3, 119.0], [24.4, 119.0], [24.5, 120.0], [24.6, 120.0], [24.7, 120.0], [24.8, 121.0], [24.9, 121.0], [25.0, 122.0], [25.1, 122.0], [25.2, 123.0], [25.3, 123.0], [25.4, 124.0], [25.5, 124.0], [25.6, 125.0], [25.7, 125.0], [25.8, 125.0], [25.9, 126.0], [26.0, 126.0], [26.1, 127.0], [26.2, 127.0], [26.3, 128.0], [26.4, 128.0], [26.5, 129.0], [26.6, 129.0], [26.7, 130.0], [26.8, 130.0], [26.9, 131.0], [27.0, 131.0], [27.1, 132.0], [27.2, 132.0], [27.3, 132.0], [27.4, 133.0], [27.5, 133.0], [27.6, 134.0], [27.7, 134.0], [27.8, 135.0], [27.9, 135.0], [28.0, 136.0], [28.1, 136.0], [28.2, 136.0], [28.3, 137.0], [28.4, 137.0], [28.5, 138.0], [28.6, 138.0], [28.7, 139.0], [28.8, 139.0], [28.9, 140.0], [29.0, 140.0], [29.1, 141.0], [29.2, 141.0], [29.3, 141.0], [29.4, 142.0], [29.5, 143.0], [29.6, 143.0], [29.7, 144.0], [29.8, 144.0], [29.9, 145.0], [30.0, 145.0], [30.1, 146.0], [30.2, 146.0], [30.3, 146.0], [30.4, 147.0], [30.5, 147.0], [30.6, 148.0], [30.7, 148.0], [30.8, 149.0], [30.9, 149.0], [31.0, 150.0], [31.1, 150.0], [31.2, 151.0], [31.3, 151.0], [31.4, 151.0], [31.5, 152.0], [31.6, 152.0], [31.7, 153.0], [31.8, 153.0], [31.9, 154.0], [32.0, 154.0], [32.1, 155.0], [32.2, 155.0], [32.3, 156.0], [32.4, 156.0], [32.5, 157.0], [32.6, 157.0], [32.7, 157.0], [32.8, 158.0], [32.9, 158.0], [33.0, 159.0], [33.1, 159.0], [33.2, 160.0], [33.3, 160.0], [33.4, 160.0], [33.5, 161.0], [33.6, 161.0], [33.7, 162.0], [33.8, 162.0], [33.9, 163.0], [34.0, 163.0], [34.1, 164.0], [34.2, 164.0], [34.3, 164.0], [34.4, 165.0], [34.5, 165.0], [34.6, 166.0], [34.7, 166.0], [34.8, 167.0], [34.9, 167.0], [35.0, 167.0], [35.1, 168.0], [35.2, 168.0], [35.3, 169.0], [35.4, 169.0], [35.5, 170.0], [35.6, 170.0], [35.7, 170.0], [35.8, 171.0], [35.9, 171.0], [36.0, 172.0], [36.1, 172.0], [36.2, 173.0], [36.3, 173.0], [36.4, 174.0], [36.5, 175.0], [36.6, 175.0], [36.7, 176.0], [36.8, 176.0], [36.9, 177.0], [37.0, 177.0], [37.1, 177.0], [37.2, 178.0], [37.3, 178.0], [37.4, 179.0], [37.5, 179.0], [37.6, 180.0], [37.7, 180.0], [37.8, 181.0], [37.9, 181.0], [38.0, 182.0], [38.1, 182.0], [38.2, 183.0], [38.3, 183.0], [38.4, 183.0], [38.5, 184.0], [38.6, 184.0], [38.7, 185.0], [38.8, 185.0], [38.9, 186.0], [39.0, 186.0], [39.1, 187.0], [39.2, 187.0], [39.3, 188.0], [39.4, 188.0], [39.5, 189.0], [39.6, 189.0], [39.7, 190.0], [39.8, 190.0], [39.9, 191.0], [40.0, 191.0], [40.1, 192.0], [40.2, 192.0], [40.3, 193.0], [40.4, 193.0], [40.5, 194.0], [40.6, 194.0], [40.7, 195.0], [40.8, 195.0], [40.9, 196.0], [41.0, 196.0], [41.1, 197.0], [41.2, 197.0], [41.3, 198.0], [41.4, 198.0], [41.5, 199.0], [41.6, 199.0], [41.7, 200.0], [41.8, 200.0], [41.9, 201.0], [42.0, 201.0], [42.1, 202.0], [42.2, 202.0], [42.3, 203.0], [42.4, 203.0], [42.5, 204.0], [42.6, 204.0], [42.7, 205.0], [42.8, 205.0], [42.9, 206.0], [43.0, 206.0], [43.1, 207.0], [43.2, 207.0], [43.3, 208.0], [43.4, 208.0], [43.5, 209.0], [43.6, 209.0], [43.7, 210.0], [43.8, 210.0], [43.9, 211.0], [44.0, 211.0], [44.1, 212.0], [44.2, 213.0], [44.3, 213.0], [44.4, 214.0], [44.5, 215.0], [44.6, 215.0], [44.7, 216.0], [44.8, 217.0], [44.9, 217.0], [45.0, 217.0], [45.1, 218.0], [45.2, 219.0], [45.3, 220.0], [45.4, 220.0], [45.5, 221.0], [45.6, 221.0], [45.7, 222.0], [45.8, 222.0], [45.9, 223.0], [46.0, 224.0], [46.1, 225.0], [46.2, 225.0], [46.3, 226.0], [46.4, 226.0], [46.5, 227.0], [46.6, 228.0], [46.7, 228.0], [46.8, 229.0], [46.9, 229.0], [47.0, 230.0], [47.1, 230.0], [47.2, 231.0], [47.3, 232.0], [47.4, 232.0], [47.5, 233.0], [47.6, 233.0], [47.7, 234.0], [47.8, 234.0], [47.9, 235.0], [48.0, 236.0], [48.1, 236.0], [48.2, 236.0], [48.3, 237.0], [48.4, 238.0], [48.5, 239.0], [48.6, 239.0], [48.7, 240.0], [48.8, 241.0], [48.9, 241.0], [49.0, 242.0], [49.1, 243.0], [49.2, 244.0], [49.3, 244.0], [49.4, 245.0], [49.5, 245.0], [49.6, 246.0], [49.7, 247.0], [49.8, 247.0], [49.9, 248.0], [50.0, 249.0], [50.1, 249.0], [50.2, 250.0], [50.3, 250.0], [50.4, 251.0], [50.5, 252.0], [50.6, 253.0], [50.7, 253.0], [50.8, 254.0], [50.9, 255.0], [51.0, 255.0], [51.1, 256.0], [51.2, 257.0], [51.3, 257.0], [51.4, 258.0], [51.5, 259.0], [51.6, 260.0], [51.7, 261.0], [51.8, 262.0], [51.9, 263.0], [52.0, 264.0], [52.1, 264.0], [52.2, 265.0], [52.3, 266.0], [52.4, 267.0], [52.5, 268.0], [52.6, 268.0], [52.7, 269.0], [52.8, 270.0], [52.9, 270.0], [53.0, 271.0], [53.1, 272.0], [53.2, 273.0], [53.3, 274.0], [53.4, 275.0], [53.5, 276.0], [53.6, 277.0], [53.7, 278.0], [53.8, 279.0], [53.9, 280.0], [54.0, 281.0], [54.1, 282.0], [54.2, 283.0], [54.3, 283.0], [54.4, 284.0], [54.5, 285.0], [54.6, 285.0], [54.7, 286.0], [54.8, 287.0], [54.9, 287.0], [55.0, 288.0], [55.1, 289.0], [55.2, 290.0], [55.3, 291.0], [55.4, 292.0], [55.5, 293.0], [55.6, 294.0], [55.7, 295.0], [55.8, 296.0], [55.9, 297.0], [56.0, 298.0], [56.1, 299.0], [56.2, 300.0], [56.3, 300.0], [56.4, 301.0], [56.5, 302.0], [56.6, 303.0], [56.7, 304.0], [56.8, 304.0], [56.9, 305.0], [57.0, 306.0], [57.1, 307.0], [57.2, 308.0], [57.3, 309.0], [57.4, 310.0], [57.5, 311.0], [57.6, 312.0], [57.7, 313.0], [57.8, 314.0], [57.9, 315.0], [58.0, 316.0], [58.1, 317.0], [58.2, 318.0], [58.3, 319.0], [58.4, 320.0], [58.5, 321.0], [58.6, 322.0], [58.7, 323.0], [58.8, 324.0], [58.9, 325.0], [59.0, 326.0], [59.1, 327.0], [59.2, 328.0], [59.3, 329.0], [59.4, 330.0], [59.5, 332.0], [59.6, 333.0], [59.7, 335.0], [59.8, 335.0], [59.9, 337.0], [60.0, 338.0], [60.1, 339.0], [60.2, 340.0], [60.3, 341.0], [60.4, 342.0], [60.5, 343.0], [60.6, 345.0], [60.7, 346.0], [60.8, 348.0], [60.9, 348.0], [61.0, 350.0], [61.1, 351.0], [61.2, 352.0], [61.3, 353.0], [61.4, 354.0], [61.5, 355.0], [61.6, 356.0], [61.7, 357.0], [61.8, 359.0], [61.9, 360.0], [62.0, 362.0], [62.1, 363.0], [62.2, 365.0], [62.3, 366.0], [62.4, 367.0], [62.5, 368.0], [62.6, 369.0], [62.7, 370.0], [62.8, 371.0], [62.9, 373.0], [63.0, 374.0], [63.1, 375.0], [63.2, 376.0], [63.3, 377.0], [63.4, 379.0], [63.5, 380.0], [63.6, 381.0], [63.7, 383.0], [63.8, 384.0], [63.9, 385.0], [64.0, 386.0], [64.1, 387.0], [64.2, 388.0], [64.3, 389.0], [64.4, 390.0], [64.5, 392.0], [64.6, 393.0], [64.7, 394.0], [64.8, 395.0], [64.9, 397.0], [65.0, 398.0], [65.1, 400.0], [65.2, 401.0], [65.3, 402.0], [65.4, 403.0], [65.5, 404.0], [65.6, 406.0], [65.7, 407.0], [65.8, 408.0], [65.9, 409.0], [66.0, 411.0], [66.1, 412.0], [66.2, 413.0], [66.3, 415.0], [66.4, 416.0], [66.5, 417.0], [66.6, 419.0], [66.7, 420.0], [66.8, 421.0], [66.9, 422.0], [67.0, 423.0], [67.1, 425.0], [67.2, 426.0], [67.3, 428.0], [67.4, 430.0], [67.5, 431.0], [67.6, 432.0], [67.7, 434.0], [67.8, 435.0], [67.9, 436.0], [68.0, 437.0], [68.1, 439.0], [68.2, 440.0], [68.3, 441.0], [68.4, 443.0], [68.5, 444.0], [68.6, 445.0], [68.7, 446.0], [68.8, 447.0], [68.9, 448.0], [69.0, 449.0], [69.1, 450.0], [69.2, 450.0], [69.3, 452.0], [69.4, 453.0], [69.5, 454.0], [69.6, 455.0], [69.7, 456.0], [69.8, 457.0], [69.9, 459.0], [70.0, 460.0], [70.1, 462.0], [70.2, 464.0], [70.3, 465.0], [70.4, 466.0], [70.5, 468.0], [70.6, 469.0], [70.7, 470.0], [70.8, 473.0], [70.9, 474.0], [71.0, 475.0], [71.1, 477.0], [71.2, 478.0], [71.3, 480.0], [71.4, 481.0], [71.5, 483.0], [71.6, 484.0], [71.7, 486.0], [71.8, 486.0], [71.9, 487.0], [72.0, 489.0], [72.1, 490.0], [72.2, 492.0], [72.3, 495.0], [72.4, 497.0], [72.5, 498.0], [72.6, 499.0], [72.7, 500.0], [72.8, 501.0], [72.9, 503.0], [73.0, 505.0], [73.1, 506.0], [73.2, 507.0], [73.3, 509.0], [73.4, 511.0], [73.5, 513.0], [73.6, 514.0], [73.7, 516.0], [73.8, 518.0], [73.9, 519.0], [74.0, 521.0], [74.1, 523.0], [74.2, 524.0], [74.3, 525.0], [74.4, 527.0], [74.5, 528.0], [74.6, 530.0], [74.7, 532.0], [74.8, 534.0], [74.9, 536.0], [75.0, 537.0], [75.1, 539.0], [75.2, 540.0], [75.3, 542.0], [75.4, 543.0], [75.5, 545.0], [75.6, 547.0], [75.7, 549.0], [75.8, 550.0], [75.9, 552.0], [76.0, 553.0], [76.1, 555.0], [76.2, 556.0], [76.3, 559.0], [76.4, 560.0], [76.5, 562.0], [76.6, 564.0], [76.7, 566.0], [76.8, 567.0], [76.9, 569.0], [77.0, 570.0], [77.1, 573.0], [77.2, 574.0], [77.3, 576.0], [77.4, 579.0], [77.5, 580.0], [77.6, 582.0], [77.7, 584.0], [77.8, 585.0], [77.9, 587.0], [78.0, 589.0], [78.1, 590.0], [78.2, 593.0], [78.3, 594.0], [78.4, 596.0], [78.5, 598.0], [78.6, 601.0], [78.7, 603.0], [78.8, 605.0], [78.9, 607.0], [79.0, 610.0], [79.1, 612.0], [79.2, 613.0], [79.3, 616.0], [79.4, 618.0], [79.5, 619.0], [79.6, 621.0], [79.7, 623.0], [79.8, 624.0], [79.9, 626.0], [80.0, 627.0], [80.1, 629.0], [80.2, 631.0], [80.3, 634.0], [80.4, 636.0], [80.5, 637.0], [80.6, 638.0], [80.7, 640.0], [80.8, 642.0], [80.9, 644.0], [81.0, 646.0], [81.1, 649.0], [81.2, 650.0], [81.3, 652.0], [81.4, 654.0], [81.5, 656.0], [81.6, 658.0], [81.7, 660.0], [81.8, 663.0], [81.9, 664.0], [82.0, 667.0], [82.1, 668.0], [82.2, 671.0], [82.3, 672.0], [82.4, 675.0], [82.5, 676.0], [82.6, 678.0], [82.7, 680.0], [82.8, 682.0], [82.9, 684.0], [83.0, 686.0], [83.1, 688.0], [83.2, 690.0], [83.3, 691.0], [83.4, 693.0], [83.5, 695.0], [83.6, 697.0], [83.7, 700.0], [83.8, 702.0], [83.9, 704.0], [84.0, 706.0], [84.1, 709.0], [84.2, 711.0], [84.3, 713.0], [84.4, 714.0], [84.5, 716.0], [84.6, 717.0], [84.7, 719.0], [84.8, 721.0], [84.9, 724.0], [85.0, 726.0], [85.1, 729.0], [85.2, 732.0], [85.3, 735.0], [85.4, 737.0], [85.5, 740.0], [85.6, 742.0], [85.7, 745.0], [85.8, 748.0], [85.9, 750.0], [86.0, 753.0], [86.1, 757.0], [86.2, 760.0], [86.3, 763.0], [86.4, 767.0], [86.5, 770.0], [86.6, 775.0], [86.7, 779.0], [86.8, 783.0], [86.9, 786.0], [87.0, 789.0], [87.1, 794.0], [87.2, 798.0], [87.3, 800.0], [87.4, 802.0], [87.5, 805.0], [87.6, 810.0], [87.7, 813.0], [87.8, 817.0], [87.9, 821.0], [88.0, 826.0], [88.1, 831.0], [88.2, 835.0], [88.3, 839.0], [88.4, 843.0], [88.5, 847.0], [88.6, 851.0], [88.7, 853.0], [88.8, 858.0], [88.9, 862.0], [89.0, 865.0], [89.1, 869.0], [89.2, 874.0], [89.3, 879.0], [89.4, 883.0], [89.5, 888.0], [89.6, 892.0], [89.7, 897.0], [89.8, 900.0], [89.9, 905.0], [90.0, 911.0], [90.1, 914.0], [90.2, 918.0], [90.3, 924.0], [90.4, 927.0], [90.5, 933.0], [90.6, 938.0], [90.7, 943.0], [90.8, 950.0], [90.9, 956.0], [91.0, 961.0], [91.1, 967.0], [91.2, 974.0], [91.3, 979.0], [91.4, 988.0], [91.5, 998.0], [91.6, 1006.0], [91.7, 1015.0], [91.8, 1021.0], [91.9, 1027.0], [92.0, 1033.0], [92.1, 1041.0], [92.2, 1050.0], [92.3, 1056.0], [92.4, 1065.0], [92.5, 1074.0], [92.6, 1081.0], [92.7, 1089.0], [92.8, 1096.0], [92.9, 1110.0], [93.0, 1119.0], [93.1, 1130.0], [93.2, 1140.0], [93.3, 1147.0], [93.4, 1157.0], [93.5, 1169.0], [93.6, 1181.0], [93.7, 1190.0], [93.8, 1200.0], [93.9, 1210.0], [94.0, 1221.0], [94.1, 1235.0], [94.2, 1246.0], [94.3, 1259.0], [94.4, 1274.0], [94.5, 1285.0], [94.6, 1293.0], [94.7, 1310.0], [94.8, 1325.0], [94.9, 1336.0], [95.0, 1351.0], [95.1, 1368.0], [95.2, 1379.0], [95.3, 1394.0], [95.4, 1412.0], [95.5, 1429.0], [95.6, 1449.0], [95.7, 1464.0], [95.8, 1481.0], [95.9, 1496.0], [96.0, 1514.0], [96.1, 1544.0], [96.2, 1570.0], [96.3, 1595.0], [96.4, 1614.0], [96.5, 1624.0], [96.6, 1647.0], [96.7, 1676.0], [96.8, 1710.0], [96.9, 1735.0], [97.0, 1765.0], [97.1, 1806.0], [97.2, 1842.0], [97.3, 1880.0], [97.4, 1926.0], [97.5, 2038.0], [97.6, 2136.0], [97.7, 2209.0], [97.8, 2266.0], [97.9, 2306.0], [98.0, 2344.0], [98.1, 2400.0], [98.2, 2451.0], [98.3, 2496.0], [98.4, 2536.0], [98.5, 2590.0], [98.6, 2623.0], [98.7, 2700.0], [98.8, 2865.0], [98.9, 3026.0], [99.0, 3181.0], [99.1, 3252.0], [99.2, 3357.0], [99.3, 3458.0], [99.4, 3524.0], [99.5, 3575.0], [99.6, 3625.0], [99.7, 3714.0], [99.8, 3790.0], [99.9, 3989.0], [100.0, 4700.0]], "isOverall": false, "label": "POST /items (5KB)", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 4927.0, "series": [{"data": [[0.0, 4643.0], [600.0, 1182.0], [700.0, 822.0], [800.0, 574.0], [900.0, 404.0], [1000.0, 302.0], [1100.0, 221.0], [1200.0, 193.0], [1300.0, 161.0], [1400.0, 133.0], [1500.0, 91.0], [100.0, 4927.0], [1600.0, 105.0], [1700.0, 75.0], [1800.0, 57.0], [1900.0, 35.0], [2000.0, 15.0], [2100.0, 30.0], [2300.0, 48.0], [2200.0, 45.0], [2400.0, 50.0], [2500.0, 54.0], [2600.0, 36.0], [2800.0, 20.0], [2700.0, 11.0], [2900.0, 11.0], [3000.0, 11.0], [3100.0, 20.0], [200.0, 3346.0], [3200.0, 28.0], [3300.0, 28.0], [3400.0, 20.0], [3500.0, 49.0], [3700.0, 29.0], [3600.0, 29.0], [3800.0, 16.0], [3900.0, 6.0], [4000.0, 7.0], [4100.0, 1.0], [4300.0, 3.0], [4200.0, 2.0], [4400.0, 4.0], [4500.0, 1.0], [4600.0, 2.0], [300.0, 2049.0], [4700.0, 1.0], [400.0, 1736.0], [500.0, 1355.0]], "isOverall": false, "label": "POST /items (5KB)", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 4700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 3.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 22888.0, "series": [{"data": [[0.0, 54.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 43.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 3.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 22888.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 17.86401326699835, "minX": 1.76304222E12, "maxY": 60.0, "series": [{"data": [[1.7630424E12, 60.0], [1.76304228E12, 54.68566610455308], [1.76304246E12, 60.0], [1.76304234E12, 60.0], [1.76304252E12, 59.57618771726535], [1.76304222E12, 17.86401326699835]], "isOverall": false, "label": "HEAVY Body Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76304252E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 73.66666666666667, "minX": 1.0, "maxY": 2370.818181818182, "series": [{"data": [[2.0, 73.66666666666667], [3.0, 106.49999999999999], [4.0, 294.6666666666667], [5.0, 205.5], [6.0, 368.15384615384613], [7.0, 446.99999999999994], [8.0, 165.33333333333334], [9.0, 229.00000000000003], [10.0, 179.13043478260866], [11.0, 224.66666666666669], [12.0, 161.04545454545456], [13.0, 468.42857142857144], [14.0, 277.96551724137936], [15.0, 190.48484848484844], [16.0, 336.6363636363636], [17.0, 194.19444444444449], [18.0, 289.49999999999994], [19.0, 327.921052631579], [20.0, 227.30555555555551], [21.0, 330.3125], [22.0, 435.42857142857144], [23.0, 1018.1578947368421], [24.0, 1065.3846153846152], [25.0, 905.6666666666667], [26.0, 514.6666666666666], [27.0, 848.5666666666666], [28.0, 480.86486486486484], [29.0, 487.5652173913043], [30.0, 909.764705882353], [31.0, 879.1666666666664], [32.0, 689.4782608695651], [33.0, 1190.027777777778], [34.0, 531.8181818181818], [35.0, 859.7999999999998], [36.0, 472.07272727272743], [37.0, 602.375], [38.0, 451.75], [39.0, 1176.15625], [40.0, 1359.7499999999998], [41.0, 1219.0], [42.0, 908.4000000000001], [43.0, 2370.818181818182], [44.0, 1578.8333333333328], [45.0, 1118.9024390243906], [46.0, 651.5999999999999], [47.0, 688.2], [48.0, 937.4642857142858], [49.0, 971.6428571428571], [50.0, 1387.7647058823532], [51.0, 471.0769230769231], [52.0, 385.40000000000003], [53.0, 739.1612903225806], [54.0, 388.547619047619], [55.0, 981.2666666666669], [56.0, 546.1666666666667], [57.0, 883.695652173913], [58.0, 944.3684210526317], [59.0, 981.9733333333337], [60.0, 405.00580901105224], [1.0, 86.0]], "isOverall": false, "label": "POST /items (5KB)", "isController": false}, {"data": [[58.145641204106205, 427.3218635810014]], "isOverall": false, "label": "POST /items (5KB)-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 60.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 15825.8, "minX": 1.76304222E12, "maxY": 555936.1333333333, "series": [{"data": [[1.7630424E12, 115534.56666666667], [1.76304228E12, 56661.0], [1.76304246E12, 111032.45], [1.76304234E12, 64747.166666666664], [1.76304252E12, 62915.0], [1.76304222E12, 15825.8]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7630424E12, 555936.1333333333], [1.76304228E12, 260074.2], [1.76304246E12, 534270.6833333333], [1.76304234E12, 310422.6], [1.76304252E12, 302791.1], [1.76304222E12, 52891.9]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76304252E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 271.43105446118284, "minX": 1.76304222E12, "maxY": 755.7592540265624, "series": [{"data": [[1.7630424E12, 291.2100031555706], [1.76304228E12, 744.1912310286675], [1.76304246E12, 314.88967328845837], [1.76304234E12, 755.7592540265624], [1.76304252E12, 271.43105446118284], [1.76304222E12, 400.4212271973467]], "isOverall": false, "label": "POST /items (5KB)", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76304252E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 271.29663962920034, "minX": 1.76304222E12, "maxY": 755.5323537722526, "series": [{"data": [[1.7630424E12, 290.980119911644], [1.76304228E12, 743.9777403035417], [1.76304246E12, 314.6760794614998], [1.76304234E12, 755.5323537722526], [1.76304252E12, 271.29663962920034], [1.76304222E12, 399.7943615257048]], "isOverall": false, "label": "POST /items (5KB)", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76304252E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.013615295480880663, "minX": 1.76304222E12, "maxY": 0.424543946932007, "series": [{"data": [[1.7630424E12, 0.03139791732407699], [1.76304228E12, 0.09241146711635759], [1.76304246E12, 0.019044491873255583], [1.76304234E12, 0.04634077423000855], [1.76304252E12, 0.013615295480880663], [1.76304222E12, 0.424543946932007]], "isOverall": false, "label": "POST /items (5KB)", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76304252E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 47.0, "minX": 1.76304222E12, "maxY": 3791.0, "series": [{"data": [[1.76304228E12, 2152.0], [1.76304234E12, 3791.0], [1.76304222E12, 1118.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.76304228E12, 1250.0], [1.76304234E12, 3791.0], [1.76304222E12, 545.2]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.76304228E12, 2152.0], [1.76304234E12, 3791.0], [1.76304222E12, 1118.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.76304228E12, 1703.5], [1.76304234E12, 3791.0], [1.76304222E12, 606.7999999999998]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.76304228E12, 432.0], [1.76304234E12, 604.0], [1.76304222E12, 47.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.76304228E12, 826.5], [1.76304234E12, 768.0], [1.76304222E12, 246.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76304234E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 47.0, "minX": 1.0, "maxY": 3791.0, "series": [{"data": [[33.0, 744.0], [34.0, 392.0], [35.0, 638.0], [36.0, 1211.0], [40.0, 215.0], [45.0, 576.0], [51.0, 1035.5], [52.0, 572.0], [54.0, 859.0], [57.0, 670.0], [62.0, 604.0], [4.0, 75.5], [67.0, 1167.0], [68.0, 774.5], [73.0, 612.0], [79.0, 522.0], [5.0, 56.0], [87.0, 432.0], [6.0, 541.5], [8.0, 336.0], [10.0, 139.0], [11.0, 768.0], [15.0, 716.0], [1.0, 3791.0], [18.0, 1031.0], [21.0, 351.0], [28.0, 1099.0], [29.0, 360.0], [31.0, 570.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[5.0, 1378.0], [7.0, 3245.0], [8.0, 2257.5], [10.0, 414.0], [11.0, 695.5], [13.0, 2024.0], [15.0, 975.0], [16.0, 225.5], [18.0, 882.0], [19.0, 1946.0], [20.0, 2479.0], [21.0, 728.0], [22.0, 1838.5], [23.0, 612.0], [24.0, 1969.5], [26.0, 1197.5], [27.0, 1456.0], [28.0, 876.5], [29.0, 205.5], [30.0, 369.5], [31.0, 1613.0], [32.0, 1354.0], [33.0, 805.0], [34.0, 430.0], [35.0, 966.0], [36.0, 821.0], [37.0, 403.0], [38.0, 663.5], [39.0, 925.0], [40.0, 2205.0], [41.0, 890.0], [43.0, 1253.5], [45.0, 482.0], [44.0, 864.0], [46.0, 708.0], [47.0, 887.0], [49.0, 243.0], [51.0, 949.0], [50.0, 327.0], [52.0, 888.0], [53.0, 597.0], [55.0, 690.0], [54.0, 541.0], [57.0, 742.0], [56.0, 838.5], [58.0, 698.0], [59.0, 726.0], [60.0, 633.0], [61.0, 662.0], [62.0, 448.0], [63.0, 872.0], [64.0, 1108.5], [67.0, 743.5], [65.0, 654.0], [66.0, 79.5], [68.0, 572.0], [69.0, 379.0], [70.0, 603.5], [73.0, 579.0], [75.0, 576.0], [72.0, 456.0], [74.0, 478.0], [79.0, 489.0], [78.0, 458.5], [77.0, 743.0], [76.0, 250.5], [81.0, 302.0], [80.0, 441.5], [82.0, 548.5], [83.0, 507.0], [87.0, 454.0], [84.0, 449.5], [86.0, 311.0], [85.0, 388.0], [89.0, 211.0], [90.0, 453.5], [88.0, 1362.0], [91.0, 301.0], [95.0, 405.0], [93.0, 285.0], [94.0, 331.5], [96.0, 344.0], [98.0, 405.0], [97.0, 442.5], [100.0, 419.0], [102.0, 522.0], [101.0, 255.5], [107.0, 110.0], [109.0, 288.0], [108.0, 372.5], [114.0, 219.5], [115.0, 254.5], [112.0, 958.0], [118.0, 225.0], [116.0, 192.5], [119.0, 149.0], [121.0, 194.0], [120.0, 202.0], [122.0, 162.5], [123.0, 182.0], [127.0, 233.0], [126.0, 206.5], [125.0, 128.0], [124.0, 278.0], [129.0, 179.0], [135.0, 157.0], [134.0, 154.0], [130.0, 208.5], [128.0, 160.0], [132.0, 196.5], [133.0, 120.0], [142.0, 167.0], [137.0, 194.0], [140.0, 170.5], [139.0, 153.0], [151.0, 111.0], [146.0, 85.5], [149.0, 131.0], [147.0, 105.0], [157.0, 149.0], [152.0, 84.5], [156.0, 108.0], [154.0, 116.5], [158.0, 125.5], [155.0, 146.0], [153.0, 65.0], [165.0, 66.0], [166.0, 48.0], [162.0, 117.0], [163.0, 121.0], [172.0, 93.5], [173.0, 81.0], [179.0, 59.0], [181.0, 110.0], [184.0, 65.5], [187.0, 47.0], [1.0, 2072.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 187.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 46.0, "minX": 1.0, "maxY": 3791.0, "series": [{"data": [[33.0, 743.0], [34.0, 391.5], [35.0, 638.0], [36.0, 1211.0], [40.0, 215.0], [45.0, 572.5], [51.0, 1035.0], [52.0, 572.0], [54.0, 859.0], [57.0, 669.0], [62.0, 604.0], [4.0, 72.5], [67.0, 1166.0], [68.0, 774.5], [73.0, 612.0], [79.0, 522.0], [5.0, 55.0], [87.0, 431.0], [6.0, 541.5], [8.0, 335.0], [10.0, 139.0], [11.0, 768.0], [15.0, 716.0], [1.0, 3791.0], [18.0, 1030.5], [21.0, 350.0], [28.0, 1098.5], [29.0, 359.5], [31.0, 570.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[5.0, 1378.0], [7.0, 3245.0], [8.0, 2257.5], [10.0, 413.0], [11.0, 695.5], [13.0, 2024.0], [15.0, 975.0], [16.0, 225.0], [18.0, 882.0], [19.0, 1946.0], [20.0, 2479.0], [21.0, 728.0], [22.0, 1838.5], [23.0, 612.0], [24.0, 1969.5], [26.0, 1197.5], [27.0, 1456.0], [28.0, 876.5], [29.0, 205.0], [30.0, 369.5], [31.0, 1613.0], [32.0, 1354.0], [33.0, 805.0], [34.0, 429.5], [35.0, 966.0], [36.0, 820.0], [37.0, 402.0], [38.0, 663.0], [39.0, 925.0], [40.0, 2205.0], [41.0, 890.0], [43.0, 1253.5], [45.0, 481.5], [44.0, 864.0], [46.0, 708.0], [47.0, 887.0], [49.0, 243.0], [51.0, 949.0], [50.0, 327.0], [52.0, 888.0], [53.0, 597.0], [55.0, 690.0], [54.0, 541.0], [57.0, 742.0], [56.0, 838.5], [58.0, 697.0], [59.0, 726.0], [60.0, 633.0], [61.0, 661.0], [62.0, 448.0], [63.0, 872.0], [64.0, 1108.0], [67.0, 743.0], [65.0, 654.0], [66.0, 79.5], [68.0, 572.0], [69.0, 379.0], [70.0, 603.5], [73.0, 579.0], [75.0, 576.0], [72.0, 456.0], [74.0, 478.0], [79.0, 489.0], [78.0, 458.5], [77.0, 743.0], [76.0, 250.5], [81.0, 302.0], [80.0, 441.0], [82.0, 548.5], [83.0, 507.0], [87.0, 452.0], [84.0, 449.5], [86.0, 311.0], [85.0, 388.0], [89.0, 211.0], [90.0, 453.5], [88.0, 1362.0], [91.0, 301.0], [95.0, 405.0], [93.0, 285.0], [94.0, 331.5], [96.0, 344.0], [98.0, 405.0], [97.0, 442.5], [100.0, 419.0], [102.0, 521.5], [101.0, 255.5], [107.0, 110.0], [109.0, 288.0], [108.0, 372.5], [114.0, 219.5], [115.0, 254.5], [112.0, 958.0], [118.0, 225.0], [116.0, 192.5], [119.0, 146.0], [121.0, 193.0], [120.0, 202.0], [122.0, 162.5], [123.0, 179.0], [127.0, 232.0], [126.0, 206.5], [125.0, 128.0], [124.0, 274.0], [129.0, 179.0], [135.0, 157.0], [134.0, 153.5], [130.0, 208.5], [128.0, 160.0], [132.0, 196.5], [133.0, 120.0], [142.0, 167.0], [137.0, 194.0], [140.0, 170.5], [139.0, 153.0], [151.0, 111.0], [146.0, 85.5], [149.0, 131.0], [147.0, 104.0], [157.0, 149.0], [152.0, 84.0], [156.0, 108.0], [154.0, 116.5], [158.0, 125.5], [155.0, 146.0], [153.0, 65.0], [165.0, 66.0], [166.0, 48.0], [162.0, 117.0], [163.0, 118.0], [172.0, 93.5], [173.0, 81.0], [179.0, 59.0], [181.0, 110.0], [184.0, 65.5], [187.0, 46.0], [1.0, 2072.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 187.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 10.266666666666667, "minX": 1.76304222E12, "maxY": 105.45, "series": [{"data": [[1.7630424E12, 105.45], [1.76304228E12, 50.2], [1.76304246E12, 101.61666666666666], [1.76304234E12, 58.8], [1.76304252E12, 56.8], [1.76304222E12, 10.266666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76304252E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.05, "minX": 1.76304222E12, "maxY": 105.63333333333334, "series": [{"data": [[1.76304228E12, 0.5666666666666667], [1.76304234E12, 0.05], [1.76304222E12, 1.05]], "isOverall": false, "label": "201", "isController": false}, {"data": [[1.7630424E12, 105.63333333333334], [1.76304228E12, 48.85], [1.76304246E12, 101.51666666666667], [1.76304234E12, 58.93333333333333], [1.76304252E12, 57.53333333333333], [1.76304222E12, 9.0]], "isOverall": false, "label": "409", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76304252E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.05, "minX": 1.76304222E12, "maxY": 105.63333333333334, "series": [{"data": [[1.76304228E12, 0.5666666666666667], [1.76304234E12, 0.05], [1.76304222E12, 1.05]], "isOverall": false, "label": "POST /items (5KB)-success", "isController": false}, {"data": [[1.7630424E12, 105.63333333333334], [1.76304228E12, 48.85], [1.76304246E12, 101.51666666666667], [1.76304234E12, 58.93333333333333], [1.76304252E12, 57.53333333333333], [1.76304222E12, 9.0]], "isOverall": false, "label": "POST /items (5KB)-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76304252E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.05, "minX": 1.76304222E12, "maxY": 105.63333333333334, "series": [{"data": [[1.76304228E12, 0.5666666666666667], [1.76304234E12, 0.05], [1.76304222E12, 1.05]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.7630424E12, 105.63333333333334], [1.76304228E12, 48.85], [1.76304246E12, 101.51666666666667], [1.76304234E12, 58.93333333333333], [1.76304252E12, 57.53333333333333], [1.76304222E12, 9.0]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76304252E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

