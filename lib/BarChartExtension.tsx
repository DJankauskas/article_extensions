import * as React from 'react';

import { IExtensionProps } from './extensions';
import { Bar } from 'react-chartjs-2';
import { createUseStyles } from 'react-jss';

export interface IProps {
    //mandatory
    data?: {
        labels?: string[],
        datasets?: {
            label: string,
            data: number[]
        }[]
    },
    title?: string,
    caption?: string,
    xAxisLabel?: string,
    yAxisLabel?: string,
    yAxisMin?: number,
    yAxisMax?: number,
    yAxisStep?: number
}

const useStyles = createUseStyles({
    ChartContainer: {
        width: "100%",
    }
})

const colors = ['#4487F0', '#C5594F', '#F7B028', '#1D9C59', '#FB6C20', '#4BBBC6'];

export const BarChartExtension: React.FC<IExtensionProps> = ({ props }: IExtensionProps) => {
    const styles = useStyles();

    const parsedProps = props as IProps;

    if (parsedProps.data && parsedProps.data.labels && parsedProps.data.datasets) {
        const options = {
            responsive: true,
            title: {
                display: !!parsedProps.title,
                text: parsedProps.title,
                fontSize: 24,
                fontFamily: "Minion Pro"
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: !!parsedProps.xAxisLabel,
                        labelString: parsedProps.xAxisLabel,
                        fontSize: 16,
                        fontFamily: "Minion Pro"
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: !!parsedProps.yAxisLabel,
                        labelString: parsedProps.yAxisLabel,
                        fontSize: 16,
                        fontFamily: "Minion Pro",
                    },
                    ticks: {
                        min: parsedProps.yAxisMin,
                        max: parsedProps.yAxisMax,
                        stepSize: parsedProps.yAxisStep
                    }
                }
                ]
            }
        }

        parsedProps.data.datasets.forEach((currentValue: any, index: number) => {
            currentValue.backgroundColor = colors[index];
            currentValue.borderColor = colors[index];
            currentValue.fill = true
        })

        return (
            <div className={styles.ChartContainer}>
                <Bar data={parsedProps.data} options={options} />
            </div>
        )
    }

    else {
        console.error('No data supplied to BarChartExtension.');
        return null;
    }
}