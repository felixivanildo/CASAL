import { Helmet } from 'react-helmet-async';
import axios from 'axios';

import { useForm, Controller, set, SetFieldValue } from 'react-hook-form';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Switch, Button } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [downloadLink, setDownloadLink] = useState(null);
  const { handleSubmit, control, reset, setValue } = useForm();

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

  const onSubmit = async (data) => {
    console.log(data)

    const transformedDate = transformDateFormat(String(data.data_ini.$d).substring(4, 15));
    const transformedDateFim = transformDateFormat(String(data.data_fim.$d).substring(4, 15));
    console.log(transformedDate, transformedDateFim); // Output: "2023-08-24"

    if (transformedDate > transformedDateFim) {
      alert("Data inicial maior que a final")
    }
    else{
      
      await axios.put('http://10.254.4.132:3005/seletivo')
    }
  };

  const handleDownload = async () => {
    try {
      console.log('clicked')
      const response = await axios.get('http://10.254.4.132:3005/api/baixar', {
        responseType: 'arraybuffer', // Important to specify responseType
      });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
    } catch (error) {
      console.error('Error downloading XLSX:', error);
    }
  };

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h2" sx={{ mb: 7 }}>
          Relatórios
        </Typography>
        {/* 
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}
        {/* 
        <ProductList products={PRODUCTS} />
        <ProductCartWidget /> */}


        {/* <div>
      <button onClick={handleDownload}>Download XLSX</button>
      {downloadLink && (
        <a href={downloadLink} download="data.xlsx">
          Click to download
        </a>
      )}
    </div> */}
        <h2>GSANEOS</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>

          <div style={{ display: "flex", justifyContent: "space-evenly", }}>

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

        <br />
        <br /><br /><br />
        <h2>GSANAS</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>

          <div style={{ display: "flex", justifyContent: "space-evenly", }}>

            <div>

              <Controller
                name="modulo"
                defaultValue={"gsanas"}

                control={control}
                render={({ field }) => <input  style={{display: "none"}} {...field}/>}
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


          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
            <div >
            <div style={{ display: "flex", flexDirection: "row" }}>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Implantação hidrometro:</p>
            <Controller
              name="implantacao_hidrometro"
              defaultValue={'302'}
              control={control}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

             <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginLeft:"40px" }}>
            <p>Subistituição hidrometro:</p>
            <Controller 
              name="substituicao_hidrometro"
              control={control}
              defaultValue={'303'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginLeft:"40px" }}>
            <p>Remanejamento hidrometro para calçada:</p>
            <Controller
              name="remanejamento_hidrometro_calcada"
              control={control}
              defaultValue={'305'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>
        </div>

        
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
          
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}> 
            <p>Retirada hidrometro:</p>
            
            <Controller
              name="retirada_hidrometro"
              control={control}
              defaultValue={'316'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            {/* Continue generating code for the rest of the tasks */}

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Religação água SA 3:</p>
            <Controller
              name="religacao_agua_sa3"
              control={control}
              defaultValue={'404'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Restabelecimento ligação água SA 3:</p>
            <Controller
              name="ligacao_agua_sa3"
              control={control}
              defaultValue={'413'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            

            </div>

            
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
          
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}> 
            <p>Desobstrução rede água até 100mm:</p>
            
            <Controller
              name="desobstrucao_rede_100"
              control={control}
              defaultValue={'507'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            {/* Continue generating code for the rest of the tasks */}

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Desobstrução rede água acima 200mm:</p>
            <Controller
              name="desobstrucai_rede_200"
              control={control}
              defaultValue={'509'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Rebaixamento rede água até 200mm:</p>
            <Controller
              name="rebaixamento_rede_100"
              control={control}
              defaultValue={'510'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            

            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
          
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}> 
            <p>Rebaixamento rede água até 100 a 200mm:</p>
            
            <Controller
              name="rebaixamento_100_200"
              control={control}
              defaultValue={'511'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            {/* Continue generating code for the rest of the tasks */}

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Remanejamento rede água ate 100mm :</p>
            <Controller
              name="remanejamento_100"
              control={control}
              defaultValue={'513'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Remanejamento rede água acima 200mm :</p>
            <Controller
              name="remanejamento_200"
              control={control}
              defaultValue={'515'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            

            </div>

            
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
          
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}> 
            <p>Vazamento rede ate 100mm:</p>
            
            <Controller
              name="vazamento_100"
              control={control}
              defaultValue={'519'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            {/* Continue generating code for the rest of the tasks */}

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Vazamento rede 100 até 200mm:</p>
            <Controller
              name="vazamento_100_200"
              control={control}
              defaultValue={'520'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Vazamento rede acima de 200mm:</p>
            <Controller
              name="vazamento_mais200"
              control={control}
              defaultValue={'521'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            

            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
          
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}> 
            <p>Sondagem rede água:</p>
            
            <Controller
              name="sondagem_rede"
              control={control}
              defaultValue={'542'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            {/* Continue generating code for the rest of the tasks */}

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Ligação água sem pavimento</p>
            <Controller
              name="ligacao_sem_pavimento"
              control={control}
              defaultValue={'544'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Ligação água paralelepipedo:</p>
            <Controller
              name="ligacao_paralelepipedo"
              control={control}
              defaultValue={'545'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            

            </div>


            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
          
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}> 
            <p>Ligação água asfalto:</p>
            
            <Controller
              name="ligacao_asfalto"
              control={control}
              defaultValue={'546'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            {/* Continue generating code for the rest of the tasks */}

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Ligação água calcada:</p>
            <Controller
              name="ligacao_calcada"
              control={control}
              defaultValue={'547'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <p>Rebaixamento rede água calçada	:</p>
            <Controller
              name="rebaixamento_calcada"
              control={control}
              defaultValue={'551'}
              render={({ field }) => <Switch defaultChecked size='small' type="checkbox" {...field} />}
            />
            </div>

            

            </div>

            

          </div>


      
          

        </div>


        
          <Button variant="contained" type='submit'>Baixar</Button>
          
        </form>

      </Container>



    </>
  );
}
