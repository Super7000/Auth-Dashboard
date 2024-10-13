// app/dashboard/charts.tsx
'use client'
import { useEffect, useState } from 'react'
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BarChart as RechartsBarChart, Bar } from 'recharts'
import { PieChart as RechartsPieChart, Pie, Cell } from 'recharts'

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
]

export const LineChart = () => {
    const [newData, setNewData] = useState(data)
    const [showModel, setShowModel] = useState(false)

    const fetchData = async () => {
        const res = await fetch('/api/data/line_and_bar_chat')
        const data = await res.json()
        setNewData(data[0].data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={newData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="amt" stroke="#FF8042" />
                </RechartsLineChart>
            </ResponsiveContainer>
            <Buttons chatData={newData} onChangeBtnClick={() => setShowModel(val => !val)} />
            {showModel && <ChatDataForm
                chatData={newData}
                onChange={(data) => setNewData(data as ChatData[])}
                onSave={fetchData}
                onClose={setShowModel}
                type="line_and_bar_chat"
            />}
        </>
    )
}

export const BarChart = () => {
    const [newData, setNewData] = useState(data)
    const [showModel, setShowModel] = useState(false)

    const fetchData = async () => {
        const res = await fetch('/api/data/line_and_bar_chat')
        const data = await res.json()
        setNewData(data[0].data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={newData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                    <Bar dataKey="amt" fill="#FF8042" />
                </RechartsBarChart>
            </ResponsiveContainer>
            <Buttons chatData={newData} onChangeBtnClick={() => setShowModel(val => !val)} />
            {showModel && <ChatDataForm
                chatData={newData}
                onChange={(data) => setNewData(data as ChatData[])}
                onSave={fetchData}
                onClose={setShowModel}
                type="line_and_bar_chat"
            />}
        </>
    )
}

const pieData = [
    { name: 'Group WWsA', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export const PieChart = () => {
    const [newData, setNewData] = useState(pieData)
    const [showModel, setShowModel] = useState(false)

    useEffect(() => {
        const eventSource = new EventSource('/api/data/pie_chat'); // Listen to SSE
        eventSource.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            console.log(newData)
            setNewData(newData.data);
        };

        return () => eventSource.close(); // Cleanup event source
    }, [])

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                    <Pie
                        data={newData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </RechartsPieChart>
            </ResponsiveContainer>
            <Buttons chatData={newData} onChangeBtnClick={() => setShowModel(val => !val)} />
            {showModel && <ChatDataForm
                chatData={newData}
                onChange={(data) => setNewData(data as { name: string, value: number }[])}
                onSave={async () => { }}
                onClose={setShowModel}
                type="pie_chat"
            />}
        </>
    )
}

function ChatDataForm({ chatData, onChange, onSave, onClose, type }: { chatData: ChatData[] | { name: string, value: number }[], onChange: (data: ChatData[] | { name: string, value: number }[]) => void, onSave: () => Promise<void>, onClose: (val: boolean) => void, type: string }) {
    return (
        <div className='flex flex-col justify-center gap-2 fixed min-w-80 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 p-3 bg-white shadow-2xl z-20 rounded-md'>
            <textarea className='p-2 px-3 w-full' value={JSON.stringify(chatData)} onChange={e => onChange(JSON.parse(e.target.value))} rows={10} />
            <div className='flex flex-row gap-2 justify-center'>
                <button onClick={async () => {
                    try {
                        await updateChatData(chatData, type)
                        await onSave()
                        onClose(false)
                    } catch (error) {
                        console.log(error)
                        alert("Something went worng")
                    }
                }} className='p-2 px-3 bg-blue-500 text-white rounded-md'>Save</button>
                <button onClick={() => onClose(false)} className='p-2 px-3 bg-orange-500 text-white rounded-md'>Close</button>
            </div>
        </div>
    )
}

function Buttons({ chatData, onChangeBtnClick }: { chatData: ChatData[] | { name: string, value: number }[], onChangeBtnClick: () => void }) {
    return (
        <div className='flex flex-row gap-2'>
            <button className='p-2 px-3 text-white bg-blue-500 rounded-md' onClick={onChangeBtnClick}>Change</button>
            <button className='bg-orange-300 p-2 px-3 rounded-md text-white' onClick={() => {
                const jsonData = JSON.stringify(chatData, null, 2); // Pretty-print JSON
                const blob = new Blob([jsonData], { type: 'application/json' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'data.json';
                link.click();
                URL.revokeObjectURL(link.href);
            }}>Export</button>
        </div>
    )
}

interface ChatData {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}

async function updateChatData(chatdata: ChatData[] | { name: string, value: number }[], type: string = 'line_and_bar_chat') {
    await fetch('/api/data/' + type, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatdata),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}