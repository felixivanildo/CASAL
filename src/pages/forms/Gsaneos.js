import React, { useState } from "react";
import { useForm, Controller } from 'react-hook-form'
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Container, Stack, Typography, Switch, Button } from '@mui/material';


function Gsaneos() {



  const [visible, setVisible] = useState('none')
  const [download, setDownload] = useState('none')
  const [downloadLink, setDownloadLink] = useState(null);


  // const handleDownload = async (data) => {
  //   try {
  //     // console.log('clicked')
  //     // const response = await axios.get('http://10.254.4.132:3005/api/baixar', {
  //     //   responseType: 'arraybuffer', // Important to specify responseType
  //     // });

  //     const blob = new Blob([data.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  //     const url = URL.createObjectURL(blob);
  //     setDownloadLink(url);
  //   } catch (error) {
  //     console.error('Error downloading XLSX:', error);
  //   }
  // };

  function transformDateFormat(dateString) {
    const months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12'
    };

    const parts = dateString.split(' ');
    const year = parts[2];
    const month = months[parts[0]];
    const day = parts[1];

    return `${year}-${month}-${day}`;
  }


  const { handleSubmit, control, reset, setValue } = useForm();


  const onSubmit = async (data) => {
    console.log(data)

    const transformedDate = transformDateFormat(String(data.data_ini.$d).substring(4, 15));
    const transformedDateFim = transformDateFormat(String(data.data_fim.$d).substring(4, 15));
    console.log(transformedDate, transformedDateFim); // Output: "2023-08-24"
    setVisible('flex')

    // try {

    //   await axios.put('http://10.254.4.132:3005/api/seletivo', { dados: data, data_ini: transformedDate, data_fim: transformedDateFim}).then((e) => {
    //     const blob = new Blob([e.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    //     const url = URL.createObjectURL(blob);
    //     setDownloadLink(url);
    //     setVisible('none')
    //     console.log(e)      
    //   })
    // } catch (error) {
    //   console.log(error)
    // }


    if (transformedDate > transformedDateFim) {
      alert("Data inicial maior que a final")
    } else if (!transformedDate || !transformedDateFim) {
      alert("Campo de data vazio")
    } else {

      const url = 'http://10.254.4.132:3005/api/seletivo';

      // Your data
      const requestData = {
        dados: data,
        data_ini: transformedDate,
        data_fim: transformedDateFim,
      };

      // Creating an Axios instance with the desired response type
      const axiosInstance = axios.create({
        responseType: 'arraybuffer', // Set the response type to 'arraybuffer'
      });

      // Making the PUT request using the Axios instance
      axiosInstance
        .put(url, requestData)
        .then((response) => {
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          setDownload('flex')
          const url = URL.createObjectURL(blob);
          setDownloadLink(url);
        })
        .catch((error) => {
          // Handle any errors here
        });
    }

  };



  return (
    <div>
      <h2>GSANEOS</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>

        <div style={{ display: 'flex', justifyContent: "center", paddingBottom: "40px", color: "red", fontWeight: "bolder", }}><p style={{ display: `${visible}` }}>Gerando Relatorio</p></div>
        <div style={{ display: "flex", justifyContent: "space-evenly", }}>
          <div>

            <Controller
              name="modulo"
              defaultValue={"gsaneos"}

              control={control}
              render={({ field }) => <input style={{ display: "none" }} {...field} />}
            />
          </div>

          <div>

            <Controller
              name="data_ini"
              control={control}
              render={({ field }) => <LocalizationProvider size="small" dateAdapter={AdapterDayjs} >
                <DatePicker label={"Data Inicial"} {...field} />
              </LocalizationProvider>}
            />
          </div>

          <div>
            <Controller

              name="data_fim"
              control={control}
              render={({ field }) =>

                <LocalizationProvider size="small" dateAdapter={AdapterDayjs} >
                  <DatePicker label={"Data Final"} {...field} />
                </LocalizationProvider>}
            />
          </div>
        </div>


        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>

          <p>Corte por debito:</p>
          <Controller
            name="corte_debito"
            control={control}
            defaultValue={'401'}
            render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
          />

          <p>Visita de cobrança:</p>
          <Controller
            name="visita_cobranca"
            control={control}
            defaultValue={'1074'}
            render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
          />

          <p>Corte a pedido:</p>
          <Controller
            name="corte_pedido"
            defaultValue={'417'}
            control={control}
            render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
          />


          <p>Fiscalização cobrança:</p>
          <Controller
            name="fiscalizacao_cobranca"
            defaultValue={'1076'}
            control={control}
            render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
          />

          <p>Fiscalização da ligação:</p>
          <Controller
            name="fiscalização_ligaçao"
            defaultValue={'103'}
            control={control}
            render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
          />
        </div>

        <Button variant="contained" type='submit'>Baixar</Button>
      </form>

    <div style={{display: "flex", justifyContent: "center", paddingTop: "20px"}}>
      <div style={{display: `${download}`}}>


        <a href={downloadLink} download="data.xlsx">
          Click to download
        </a>

      </div>
    </div>
    </div>
  )
}

export default Gsaneos