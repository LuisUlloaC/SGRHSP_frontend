import React, { lazy, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loader, Message } from '../../../containers/utils/index';
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader
} from '@coreui/react'
import {
  CChartPie,
  CChartDoughnut,
} from '@coreui/react-chartjs'
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";
import {getCatOcupXTrab, getMainNumbers, getMunicipioXClasificacion, getNivPrepXTrab, getTrabajadoresXClasificacion, getUnidadOrgXNivPrep} from "../../../redux/actions/dashboardActions";
import {TRABXCLAS_RESET, MUNXCLAS_RESET, CATOCUPXTRAB_RESET, NIVPREPXTRAB_RESET, UNIDADORGXNIVPREP_RESET} from "../../../redux/constants/dashboardConstants";

const WidgetsDropdown = lazy(() => import("../../../widgets/WidgetsDropdown.js"));

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  // User Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Numbers Selector
  const {
    users,
    loading,
    error: errorNumbers,
  } = useSelector((state) => state.numbers);

  const trabXClasList = useSelector((state) => state.trabXClas);
  const {error, trabXClas} = trabXClasList;

  const munXClasList = useSelector((state) => state.munXClas);
  const {munXClas} = munXClasList;

  const catOcupXTrabList = useSelector((state) => state.catOcupXTrab);
  const {catOcupXTrab} = catOcupXTrabList;

  const nivPrepXTrabList = useSelector((state) => state.nivPrepXTrab);
  const {nivPrepXTrab} = nivPrepXTrabList;

  const unidadOrgXNivPrepList = useSelector((state) => state.unidadOrgXNivPrep);
  const {unidadOrgXNivPrep} = unidadOrgXNivPrepList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      if (userInfo.isAdmin){
       dispatch(getMainNumbers());
      } else {
        dispatch(getTrabajadoresXClasificacion());
        dispatch(getMunicipioXClasificacion());
        dispatch(getCatOcupXTrab());
        dispatch(getNivPrepXTrab());
        dispatch(getUnidadOrgXNivPrep());
      }
    }return () => {
      dispatch({type: TRABXCLAS_RESET , MUNXCLAS_RESET , CATOCUPXTRAB_RESET, NIVPREPXTRAB_RESET, UNIDADORGXNIVPREP_RESET});

    };
  }, [userInfo, history, dispatch]);

  const colors = [];

  function updateColors() {
  for (var i = 0; i < 10000 ; i++){
    colors.push(randomRGB())}
  };

  function randomRGB() {
    var roundValue = Math.round, rndmValue = Math.random, maxNum = 255;
    return 'rgba(' + roundValue(rndmValue()*maxNum) + ',' + roundValue(rndmValue()*maxNum) + ',' + roundValue(rndmValue()*maxNum) + ')';
  };
  


  if(userInfo?.isAdmin){
    return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : errorNumbers ? (
        <Message variant="danger">{errorNumbers}</Message>
      ) : (
        <WidgetsDropdown
          users={String(users)}
        />
      )}

    </React.Fragment>
  );

  } else {
    return (
        <React.Fragment>
          {loading ? (
            <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              updateColors(),
              <CCardGroup columns className = "cols-2" >
                <CCard>
                  <CCardHeader>
                    Clasificaciones por cantidad de Trabajadores
                  </CCardHeader>
                  <CCardBody>
                    <CChartPie
                      datasets={[
                        {
                          backgroundColor: colors,
                          data: trabXClas?.map(data => data.cantidad)
                        }
                      ]}
                      labels= {trabXClas?.map(data => data.nombre)}
                      options={{
                        maintainAspectRatio: true,
                        tooltips: {
                          enabled: true
                        }
                      }}
                    />
                  </CCardBody>
                </CCard>
                <CCard>
                  <CCardHeader>
                    Municipio por Clasificaciones
                  </CCardHeader>
                  <CCardBody>
                    <CChartDoughnut
                      datasets={[
                        {
                          backgroundColor: colors,
                          data: munXClas?.map(munData => munData.cantidad)
                        }
                      ]}
                      labels={munXClas?.map(munData => munData.nombre)}
                      options={{
                        maintainAspectRatio: true,
                        tooltips: {
                          enabled: true
                        }
                      }}
                    />
                  </CCardBody>
                </CCard>

                <CCard>
                  <CCardHeader>
                    Categoría Ocupacional por Trabajadores
                  </CCardHeader>
                  <CCardBody>
                    <CChartDoughnut
                      datasets={[
                        {
                          backgroundColor: colors,
                          data: catOcupXTrab?.map(catData => catData.cantidad)
                        }
                      ]}
                      labels={catOcupXTrab?.map(catData => catData.nombre)}
                      options={{
                        maintainAspectRatio: true,
                        tooltips: {
                          enabled: true
                        }
                      }}
                    />
                  </CCardBody>
                </CCard>

                <CCard>
                  <CCardHeader>
                    Nivel de Preparación por Trabajadores
                  </CCardHeader>
                  <CCardBody>
                    <CChartDoughnut
                      datasets={[
                        {
                          backgroundColor: colors,
                          data: nivPrepXTrab?.map(nivPrepData => nivPrepData.cantidad)
                        }
                      ]}
                      labels={nivPrepXTrab?.map(nivPrepData => nivPrepData.nombre)}
                      options={{
                        maintainAspectRatio: true,
                        tooltips: {
                          enabled: true
                        }
                      }}
                    />
                  </CCardBody>
                </CCard>

                <CCard>
                  <CCardHeader>
                    Unidad Organizativa por Nivel de Preparación
                  </CCardHeader>
                  <CCardBody>
                    <CChartDoughnut
                      datasets={[
                        {
                          backgroundColor: colors,
                          data: unidadOrgXNivPrep?.map(unidadOrgXNivPrepData => unidadOrgXNivPrepData.cantidad)
                        }
                      ]}
                      labels={unidadOrgXNivPrep?.map(unidadOrgXNivPrepData => unidadOrgXNivPrepData.nombre)}
                      options={{
                        maintainAspectRatio: true,
                        tooltips: {
                          enabled: true
                        }
                      }}
                    />
                  </CCardBody>
                </CCard>
              </CCardGroup>

            )
          }
          

        </React.Fragment>
    );
  }

};

export default HomeScreen;
