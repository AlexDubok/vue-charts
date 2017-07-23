# vue chart demo

> A Vue.js project

## **Build Setup**

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## **Chart API reference**

### **Bar Chart**
#### Usage:
```
import Bars from '../lib/Bars';

const chartContainer = document.querySelector(.chart);
const chart = new Bars(chartContainer, config);

chart.init();
```

### **Line Chart**
#### Usage:
```
import Line from '../lib/Line';

const chartContainer = document.querySelector(.chart);
const chart = new Line(chartContainer, config);

chart.init();
```

### **Pie Chart**
#### Usage:
```
import Pie from '../lib/Pie';

const chartContainer = document.querySelector(.chart);
const chart = new Pie(chartContainer, config);

chart.init();
```

### **Config**
#### chart
- *chart*.**width** - width of tyhe chart.
- *chart*.**height** - height of tyhe chart.
- *chart*.**margin** - object with margin values: {top, right, bottom, right}.
- *chart*.**barWidth** - desired bar width. If not specified, will be set automatically.

#### xAxis (bar & line)
- *xAxis*.**title** - title of the xAxis.
- *xAxis*.**labelKey** - key in series.data object to use as axis label.
- *xAxis*.**labelClass** - css class for axis label customization.

#### yAxis (bar & line)
- *xAxis*.**title** - title of the yAxis.
- *xAxis*.**labelClass** - css class for axis label customization.

#### series
- *series*.**data** - array of object. Each object represents one data point.
```
    series: {
        data: [
            {
                y: 11,            // required field
                color: '#c0ffee', // optional color of the data point
                x: 'apples'       // optional field
            }
        ]
    }
```
- *series*.**labelKey** - (pie chart only) key in datapoint object, which value should be displayed as label.
- *series*.**labelClass** - (pie chart only) css class for label.


#### tooltip
- *tooltip*.**className** -  css class for tooltip customization.
- *tooltip*.**formatLabel**([point]) - returns tooltip string.
