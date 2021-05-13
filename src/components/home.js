import axios from 'axios'
import { useEffect, useState } from 'react';

function Home() {

    const [sentDate, setSentDate] = useState(new Date("2020-12-30"));
    var [today, setToday] = useState(new Date());
    console.log(sentDate)
    console.log(today)
    const pin = "301001";


    useEffect(() => {


        var centers = [];
        var sessions_all = [];
        var date = formatDate(new Date())

        if (sentDate !== date) {
            axios.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pin + "&date=" + date)
                .then((result) => {
                    centers = result.data.centers
                    centers.map((center) => {
                        center.sessions.map((session) => {
                            sessions_all.push(session)
                        })
                    })
                    sessions_all = sessions_all.filter((session) => { return (session.min_age_limit === 45) && (session.available_capacity > 0) }); //Filter out 18+ age group from 45+
                    console.log(sessions_all);

                    if (sessions_all.length > 0) {
                        callNotifier();
                        setSentDate(date);
                        callTimer();
                    }
                    else
                        callTimer()
                }).catch((error) => {
                    console.log(error)
                })
        }
        else {
            callTimer()
        }

    }, [today])


    function callNotifier() {
       
    }

    function callTimer() {
        setTimeout(() => {
            setToday(new Date());
        }, 4000);
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('-');
    }

    return (
        <div className="App">
            COVID SLOT NOTIFIER

            By : Vijay Dhakad
        </div>
    )
}
export default Home;