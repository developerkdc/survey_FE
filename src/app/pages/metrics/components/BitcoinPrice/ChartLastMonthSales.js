import React from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import {dailyTraffic} from "./data";
import {capitalizeFLetter} from "@jumbo/utils";
import Div from "@jumbo/shared/Div";

const ChartLastMonthSales = () => {
    return (
        <ResponsiveContainer height={120}>
            <AreaChart data={dailyTraffic} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <defs>
                    <linearGradient id="colorLastMonthSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b29af4"/>
                        <stop offset="95%" stopColor="#7352c7"/>
                    </linearGradient>
                </defs>
                <Tooltip
                    animationEasing={"ease-in-out"}
                    content={({active, label, payload}) => {
                        return active ? (
                            <Div sx={{color: "common.white"}}>
                                {payload.map((row, index) => {
                                    return (
                                        <div key={index} className={index !== payload.length - 1 ? "mb-1" : ""}>
                                            <div style={{
                                                color: row.color,
                                                fontSize: 8,
                                                letterSpacing: 2,
                                                textTransform: 'uppercase'
                                            }}>
                                                {capitalizeFLetter(row.name)}
                                            </div>
                                            <div style={{
                                                color: row.color
                                            }}
                                            >{row.value} Feedback
                                            </div>
                                        </div>
                                    )
                                })}
                            </Div>
                        ) : null;
                    }}
                    wrapperStyle={{
                        background: 'rgba(0,0,0,0.8)',
                        borderRadius: 4,
                        padding: '5px 8px',
                        fontWeight: 500,
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }}
                    cursor={false}
                />
                <CartesianGrid strokeDasharray="6 1 2" horizontal={false} strokeOpacity={0.7}/>
                <XAxis dataKey="day" hide/>
                <Area type={"monotone"} dataKey="count" strokeWidth={2} stackId="2" stroke="#FFf"
                      fill={"url(#colorLastMonthSales)"} fillOpacity={.7}/>
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default ChartLastMonthSales;
