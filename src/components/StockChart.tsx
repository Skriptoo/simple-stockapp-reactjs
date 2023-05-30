import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { Data, Volume } from './StockApp'

const StockChart = (props: {currentCompany: {}, data: Data[], volume: Volume[], symbol: string, type: string}) => {

    
    console.log(props.currentCompany)
    return (
         <div className="container-fluid row">
            <div className="container-fluid col-10">
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={{
                        chart: {
                            height: 700
                        },

                        title: {
                            text: props.symbol
                        },

                        plotOptions: {
                            series: {
                                showInLegend: true,
                                accessibility: {
                                    exposeAsGroupOnly: true
                                }
                            }
                        },  

                        rangeSelector: {
                            selected: 2
                        },

                        legend: {
                            enabled: true
                        },

                        yAxis: [{
                            height: '80%'
                        }, {
                            top: '80%',
                            height: '20%'
                        }],

                        series: [{
                            type: props.type.toLowerCase(),
                            id: 'aapl',
                            name: props.symbol,
                            data: props.data
                        }, {
                            type: 'column',
                            id: 'volume',
                            name: 'Volume',
                            data: props.volume,
                            yAxis: 1
                        }]
                    }}
                />
            </div>
        </div>
    )
    
}

export default StockChart;