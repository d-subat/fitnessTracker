import React, {Component} from 'react';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function compareNumbers(a, b) {
    return a - b;
  }
  
class BarChart extends Component {
      state = ({
              data: [],
              series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
              labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
              colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
          }
      );
      componentDidMount =  () => {
          this.populateArray();
          setInterval(this.populateArray, 2000);
      }
      populateArray = () => {
          var data = [],
              series = 5,//getRandomInt(2, 10),
              serieLength = 5;//getRandomInt(2, 10);
      
          for (var i = series; i--; ) {
              var tmp = [];
              
              for (var j = serieLength; j--; ) {
                  tmp.push(getRandomInt(0, 20));
              }
              
              data.push(tmp);			
          }
          
          this.setState({ data: data });
      }
      render() {
          return (
              <section>
                  <Charts
                      data={ this.state.data }
                      labels={ this.state.series }
                      colors={ this.state.colors }
                      height={ 250 }
                  />
              
                  
                  <Legend labels={ this.state.labels } colors={ this.state.colors } />
              </section>
          );
      }
  };
  
  
  
  const Legend = (props) => {
    var labels = props.labels,
    colors = props.colors;
    

          
          return (
          <div className="Legend">
              { labels.map(function(label, labelIndex) {
                  return (
                  <div>
                      <span className="Legend--color" style={{ backgroundColor: colors[labelIndex % colors.length]  }} />
                      <span className="Legend--label">{ label }</span>
                  </div>
                  );
              }) }
          </div>
          
  )};
  
  const Charts = (props) => {

          
          const    data = props.data,
              layered = props.grouping === 'layered' ? true : false,
              stacked = props.grouping === 'stacked' ? true : false,
              opaque = props.opaque;
          let    max = 0;
          
          for (var i = data.length; i--; ) {
              for (var j = data[i].length; j--; ) {
                  if (data[i][j] > max) {
                      max = data[i][j];
                  }
              }
          }
          
                  
          return (
              <div className={ 'Charts' + (props.horizontal ? ' horizontal' : '' ) }>
                  { data.map(function (serie, serieIndex) {
                       var sortedSerie = serie.slice(0),
                           sum;
                       
                       sum = serie.reduce(function (carry, current) {
                           return carry + current;
                      }, 0);
                       sortedSerie.sort(compareNumbers);				 		
                                       
                      return (
                          <div className={ 'Charts--serie ' + (props.grouping) }
                               key={ serieIndex }
                              style={{ height: props.height ? props.height: 'auto' }}
                          >
                          <label>{ props.labels[serieIndex] }</label>
                          { serie.map(function (item, itemIndex) {
                              var color = props.colors[itemIndex], style,
                                  size = item / (stacked ? sum : max) * 100;
                              
                              style = {
                                  backgroundColor: color,
                                  opacity: opaque ? 1 : (item/max + .05),
                                  zIndex: item
                              };
                          
                              if (props.horizontal) {
                                  style['width'] = size + '%';
                              } else {								
                                  style['height'] = size + '%';						
                              }
      
                              if (layered && !props.horizontal) {
                                  //console.log(sortedSerie, serie, sortedSerie.indexOf(item));
                                  style['right'] = ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%';
                                  // style['left'] = (itemIndex * 10) + '%';
                              }
                          
                           return (
                               <div
                                   className={ 'Charts--item ' + (props.grouping) }
                                   style={ style }
                                  key={ itemIndex }
                              >
                                   <b style={{ color: color }}>{ item }</b>
                               </div>
                          );
                          }) }
                          </div>
                      );
                  }) }
              </div>
          )
      
  };
  
  export default BarChart;