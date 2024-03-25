import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ClientRow from './dashboard/ClientRow';
import DashHead from './dashboard/DashHead';
import JobRow from './dashboard/JobRow';
import Windowpane from './ui/Windowpane';
import EdenSmallSVG from './img/EdenSmallSVG.jsx';


export default function Dashboard() {

  mapboxgl.accessToken = document.getElementById('mapboxpub').innerText;
  const [clientdata, setClientData] = useState([]);
  const [user, setUser] = useState({});

  //dashmap
  const mapContainer = useRef(null);
  const map = useRef(null);
  const startcolor = '#219781';
  const brightcolor = '#f87954';
  const [jobs, _setJobs] = useState([]);
  const jobsRef = useRef(jobs);
  function setJobs(list) {
      jobsRef.current = list;
      _setJobs(list);
  }

  const [chosen, _setChosen] = useState([]);
  const chosenRef = useRef(chosen);
  function setChosen(list) {
      chosenRef.current = list;
      _setChosen(list);
  }
  function addtoChosen(id, chosenRef, jobsRef) {
      let job = jobsRef.current.find((job) => job.job.id == id);
      let newchosen = [...chosenRef.current, job];
      setChosen(newchosen);
  }
  function removeChosen(id, chosenRef) {
      let newchosen = [...chosenRef.current];
      let dex = newchosen.findIndex((job)=> job.job.id == id);
      newchosen.splice(dex,1);
      setChosen(newchosen);
  }

  //map elements
  const [elements, _setElements] = useState({});
  const elementsRef = useRef(elements);
  function setElements(obj) {
      elementsRef.current = obj;
      _setElements(obj);
  }

  function buildElements(jobdata, map, elRef, chosenRef, jobsRef) {
    function formatDate(date) {
      if(date === '') return '';
      let fulldate = date.split('T')[0].split('-');
      let fulltime = date.split('T')[1].split('.000');
      let time = fulltime[0].split(':');

      const options = {weekday:'long',month:'short',day:'numeric',hour:'numeric',minute:'numeric'};

      let thisdate = new Date(fulldate[0],fulldate[1],fulldate[2],time[0],time[1]);
      return thisdate.toLocaleDateString('en-US',options);
    }

    let telements = {};
    for(let job of jobdata) {
      let pop = new mapboxgl.Popup({
          anchor: 'top-left',
          closeButton: false,
      })
          .setHTML(
          `<div class='grid gap-[2px] font-inter font-bold'><p>${job.client.name}</p><p>${formatDate(job.job.start)}</p></div>`
          )
          .setLngLat([job.longitude, job.latitude]);
      
      let openmark = new mapboxgl.Marker({
          color: startcolor,
      })
          .setLngLat([job.longitude, job.latitude])
          .addTo(map);

      let chosenmark = new mapboxgl.Marker({
          color: brightcolor,
      })
          .setLngLat([job.longitude, job.latitude]);
      
      let jobid = job.job.id;

      openmark.getElement().addEventListener('click', (e) => {
          e.stopPropagation();
          toggleMark(jobid, elRef, map, chosenRef, jobsRef);
      });

      chosenmark.getElement().addEventListener('click', (e) => {
          e.stopPropagation();
          toggleMark(jobid, elRef, map, chosenRef, jobsRef);
      });

      openmark.getElement().addEventListener('mouseenter', () => {
          elRef.current[jobid].popup.addTo(map);
      });
      openmark.getElement().addEventListener('mouseleave', () => {
          elRef.current[jobid].popup.remove();
      });

      telements[jobid] = {
          open:openmark,
          chosen:chosenmark,
          popup:pop,
          selected:false,
      }
    }
    setElements(telements);
  }
  function toggleMark(jobid, elRef, map, chosenRef, jobsRef) {
    let el = elRef.current[jobid];
    if(el.selected) {
    el.chosen.remove();
    el.selected = false;
    el.open.addTo(map);
    removeChosen(jobid, chosenRef);
    } else {
    el.open.remove();
    el.chosen.addTo(map);
    el.selected = true;
    addtoChosen(jobid, chosenRef, jobsRef);
    }
    elRef.current[jobid] = el;
    _setElements(elRef.current);
  }
  function setBounds(jobs, map) {
    let baseLL = new mapboxgl.LngLat(jobs[0].longitude, jobs[0].latitude);
    //mapbounds setting
    const bounds = new mapboxgl.LngLatBounds(
      baseLL,
      baseLL
    );
    for (let item of jobs) {
      let thisll = new mapboxgl.LngLat(item.longitude, item.latitude);
      bounds.extend(thisll);
    }
    map.fitBounds(bounds, { padding: 100 });
  }

  useEffect(() => {
    const pid = window.location.href.split('/').slice(-1);

    if (map.current) return;
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        center: [-157.858,21.315],
        zoom: 13,
        maxZoom: 16,
        //cooperativeGestures: true,
        style: `mapbox://styles/mapbox/satellite-v9`,
    });

    fetch(`/data/dashboard`)
      .then((response) => response.json())
      .then((data) => {
        setClientData(data.clients);
        setJobs(data.jobs);
        setUser(data.user);
        
        if(data.jobs.length > 0) {
          buildElements(data.jobs, map.current, elementsRef, chosenRef, jobsRef);
          setBounds(data.jobs, map.current);
        }
      });

  }, []);

  return (
    <div className="grid lg:grid-cols-[1fr_5fr]">
      <div className="row-span-full bg-dark max-lg:min-h-12">
        <div className="lg:flex lg:flex-col lg:justify-between h-full">
          <div className="lg:flex lg:flex-col grid grid-cols-4">
            <a href="/clients/new" className="navlink">
              Add Client
            </a>
            <a href="/properties/new" className="navlink">
              Add Property
            </a>
            <a href="/jobs" className="navlink">
              Jobs
            </a>
            <a href="/clients" className="navlink">
              Clients
            </a>
            <a href="/user/calendar" className="navlink">
              Calendar
            </a>
            <a href="/user/fleet" className="navlink">
              Fleet Manager
            </a>
            <a href="/user/profile" className="navlink">
              Config
            </a>
          </div>
          <EdenSmallSVG />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:p-4 text-lg text-dark font-inter min-h-screen">
        <div
          className="grid md:grid-cols-2 bg-dark lg:h-[40svh]"
        >
          <div id="jobsmap" ref={mapContainer} className="min-h-80"></div>
          <Windowpane
          title="Active Jobs"
          content={jobs.map((job, j) => (
            <JobRow jobdata={job} key={j} index={j}/>
          ))}
          mainclass="scrollpane max-h-[40svh]"
          />
        </div>
        <Windowpane
          title="Active Clients"
          content={clientdata.map((client, i) => (
            <ClientRow
              client={client[0]}
              properties={client[1]}
              index={i}
              key={i}
            />
          ))}
          mainclass="scrollpane max-h-[80svh]"
        />
        <Windowpane
          title={user.email}
          content={<DashHead user={user} />}
          mainclass="mainpane"
        />
      </div>
    </div>
  );
}
