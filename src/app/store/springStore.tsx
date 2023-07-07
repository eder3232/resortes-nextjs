'use client'
import { create } from 'zustand'
import { initialEdgesData, initialVerticesData } from '../data/data1'
import { IInputReactVertices, IParsedVertexData } from '../interfaces/vertices'
import { IInputReactEdges, IParsedEdgeData } from '../interfaces/edges'
import { immer } from 'zustand/middleware/immer'
import { v4 as uuidv4 } from 'uuid'
import { Vertices } from '../logic/vertices'
import { Edges } from '../logic/edges'
import { ILocalArrays, IOrderDOF, Spring } from '../logic/spring'

interface IError {
  name: string
  message: string
  typeError: string
  errorCode: number
}

interface ISpringConfig {
  isRestrictedAbove: boolean
  userWantToDefineDOF: boolean
}

interface ISpringState {
  isCalculated: boolean
  reactVertices: IInputReactVertices[]
  reactEdges: IInputReactEdges[]
  errors: { vertices: IError[]; edges: IError[]; logic: IError[] }
  config: ISpringConfig
  res: {
    orderDOF: IOrderDOF[]
    locals: Map<string, ILocalArrays>
    utils: {
      kGlobalHistory: {
        label: string
        value: number[][]
      }[]
      internalForces: Map<
        string,
        {
          u_i: number
          u_j: number
          k: number
          internalForce: number
        }
      >
    }
    k: {
      global: number[][]
      krr: number[][]
      kru: number[][]
      kur: number[][]
      kuu: number[][]
    }
    f: {
      global: (number | string)[][]
      restricted: string[][]
      unrestricted: number[][]
      solved: number[][]
    }
    u: {
      global: (number | string)[][]
      restricted: number[][]
      unrestricted: string[][]
      solved: number[][]
    }
  }
}

interface ISpringActions {
  controller_userWantToDefineDOF: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
  controller_isRestrictedAbove: (e: React.ChangeEvent<HTMLInputElement>) => void
  vertices_onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  vertices_onClickCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void
  vertices_onAddNewRow: (i: number) => void
  vertices_onDeleteRow: (i: number) => void
  edges_onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  edges_onChange2: (value: string, index: number, identifier: string) => void
  edges_onAddNewRow: (i: number) => void
  edges_onDeleteRow: (i: number) => void
  calculate: () => void
  firstCalculate: () => void
}

export const useSpringStore = create(
  immer<ISpringState & ISpringActions>((set) => ({
    isCalculated: false,
    config: {
      isRestrictedAbove: true,
      userWantToDefineDOF: false,
    },
    errors: {
      vertices: [],
      edges: [],
      logic: [],
    },
    reactVertices: initialVerticesData,
    reactEdges: initialEdgesData,
    // *Resultados
    res: {
      locals: new Map(),
      orderDOF: [],
      utils: {
        kGlobalHistory: [],
        internalForces: new Map(),
      },
      k: {
        global: [],
        krr: [],
        kru: [],
        kur: [],
        kuu: [],
      },
      f: {
        global: [],
        restricted: [],
        unrestricted: [],
        solved: [],
      },
      u: {
        global: [],
        restricted: [],
        unrestricted: [],
        solved: [],
      },
    },
    // *Config
    firstCalculate: () =>
      set((state) => {
        state.isCalculated = true
      }),
    controller_userWantToDefineDOF: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => {
        state.config.userWantToDefineDOF = e.target.checked
      }),
    controller_isRestrictedAbove: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => {
        state.config.isRestrictedAbove = e.target.checked
      }),
    // *Vertices
    vertices_onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => {
        const fieldName = e.target.name
        const identifier = fieldName.split('-')[0] as
          | 'name'
          | 'force'
          | 'displacement'
          | 'userDOF'
        const index = Number(fieldName.split('-')[1])

        state.reactVertices[Number(index)][identifier] = e.target.value
      }),

    vertices_onClickCheckbox: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => {
        const fieldName = e.target.name
        const identifier = fieldName.split('-')[0] as 'isRestricted'
        const index = Number(fieldName.split('-')[1])
        state.reactVertices[Number(index)][identifier] =
          !state.reactVertices[Number(index)][identifier]

        if (state.reactVertices[Number(index)][identifier] === true) {
          state.reactVertices[Number(index)]['force'] = '0'
        } else {
          state.reactVertices[Number(index)]['displacement'] = '0'
        }
      }),

    vertices_onAddNewRow: (i) =>
      set((state) => {
        const elementToInsert = {
          name: `v${state.reactVertices.length + 1}`,
          force: '0',
          displacement: '0',
          isRestricted: false,
          userDOF: `${state.reactVertices.length + 1}`,
          id: uuidv4(),
        }
        state.reactVertices.splice(i + 1, 0, elementToInsert)
      }),

    vertices_onDeleteRow: (i) =>
      set((state) => {
        state.reactVertices.splice(i, 1)
      }),

    edges_onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => {
        const fieldName = e.target.name
        const identifier = fieldName.split('-')[0] as 'name' | 'from' | 'to'
        const index = Number(fieldName.split('-')[1])

        state.reactEdges[Number(index)][identifier] = e.target.value
      }),

    edges_onChange2: (value: string, index: number, identifier: string) =>
      set((state) => {
        state.reactEdges[index][identifier as 'name' | 'from' | 'to'] = value
      }),

    edges_onChangeCustom: (value: any, index: number, identifier: string) =>
      set((state) => {
        state.reactEdges[index][identifier as 'name' | 'from' | 'to'] = value
      }),

    edges_onAddNewRow: (i) =>
      set((state) => {
        const elementToInsert = {
          name: `e${state.reactEdges.length + 1}`,
          from: `v0`,
          to: `v0`,
          k: '0',
          id: uuidv4(),
        }
        state.reactEdges.splice(i + 1, 0, elementToInsert)
      }),

    edges_onDeleteRow: (i) =>
      set((state) => {
        state.reactEdges.splice(i, 1)
      }),

    calculate: () => {
      set((state) => {
        //validacion de datos

        state.errors.vertices = []
        state.errors.edges = []
        state.errors.logic = []
        // Vertices
        //los nombres deben ser unicos - vertices
        const verticesNames: string[] = []
        state.reactVertices.map((vertex, index) => {
          if (verticesNames.includes(vertex.name)) {
            state.errors.vertices.push({
              name: 'Nombre de nudo duplicado',
              message: `El nudo  ${index + 1} llamado ${
                vertex.name
              } ya existe!`,
              typeError: 'userInput',
              errorCode: 1,
            })
          } else {
            verticesNames.push(vertex.name)
          }
        })
        //un nudo restringido no puede tener una fuerza aplicada(debe ser 0)
        state.reactVertices.map((vertex, index) => {
          if (vertex.isRestricted === true) {
            if (vertex.force !== '0') {
              state.errors.vertices.push({
                name: 'Nudo restringido con fuerza aplicada',
                message: `El nudo  ${index + 1} llamado ${
                  vertex.name
                } es restringido y tiene una fuerza aplicada! (debe ser "0")`,
                typeError: 'userInput',
                errorCode: 2,
              })
            }
          }
        })
        //un nudo no restringido no puede tener un desplazamiento aplicado(debe ser 0)
        state.reactVertices.map((vertex, index) => {
          if (vertex.isRestricted === false) {
            if (vertex.displacement !== '0') {
              state.errors.vertices.push({
                name: 'Nudo no restringido con desplazamiento aplicado',
                message: `El nudo  ${index + 1} llamado ${
                  vertex.name
                } no es restringido y tiene un desplazamiento aplicado! (debe ser "0")`,
                typeError: 'userInput',
                errorCode: 3,
              })
            }
          }
        })

        //las fuerzas y los desplazamientos deben ser valores numericos
        state.reactVertices.map((vertex, index) => {
          if (isNaN(Number(vertex.force))) {
            state.errors.vertices.push({
              name: 'Fuerza no numerica',
              message: `El nudo  ${index + 1} llamado ${
                vertex.name
              } tiene una fuerza no numerica! (debe ingresar un número)`,
              typeError: 'userInput',
              errorCode: 5,
            })
          }
          if (isNaN(Number(vertex.displacement))) {
            state.errors.vertices.push({
              name: 'Desplazamiento no numerico',
              message: `El nudo  ${index + 1} llamado ${
                vertex.name
              } tiene un desplazamiento no numerico! (debe ingresar un número))`,
              typeError: 'userInput',
              errorCode: 6,
            })
          }
        })

        // Edges
        //los nombres deben ser unicos - edges
        const edgesNames: string[] = []
        state.reactEdges.map((edge, index) => {
          if (edgesNames.includes(edge.name)) {
            state.errors.edges.push({
              name: 'Nombre de resorte duplicado',
              message: `El resorte  ${index + 1} llamado ${
                edge.name
              } ya existe!`,
              typeError: 'userInput',
              errorCode: 4,
            })
          } else {
            edgesNames.push(edge.name)
          }
        })
        //los valores de k deben ser numericos
        state.reactEdges.map((edge, index) => {
          if (isNaN(Number(edge.k))) {
            state.errors.edges.push({
              name: 'Valor de k no numerico',
              message: `El resorte  ${index + 1} llamado ${
                edge.name
              } tiene un valor de k no numerico! (debe ingresar un número)`,
              typeError: 'userInput',
              errorCode: 7,
            })
          }
        })
        //los nudos from y to deben existir
        state.reactEdges.map((edge, index) => {
          const from = edge.from
          const to = edge.to
          const fromExist = state.reactVertices.find(
            (vertex) => vertex.name === from
          )
          const toExist = state.reactVertices.find(
            (vertex) => vertex.name === to
          )
          if (fromExist === undefined) {
            state.errors.edges.push({
              name: 'Nudo from no existe',
              message: `El resorte  ${index + 1} llamado ${
                edge.name
              } tiene un nudo from que no existe!`,
              typeError: 'userInput',
              errorCode: 8,
            })
          }
          if (toExist === undefined) {
            state.errors.edges.push({
              name: 'Nudo to no existe',
              message: `El resorte  ${index + 1} llamado ${
                edge.name
              } tiene un nudo to que no existe!`,
              typeError: 'userInput',
              errorCode: 9,
            })
          }
        })

        //En caso de que el usuario no haya definido los grados de libertad le asignaremos un valor por defecto que se correspondera con el index del nudo
        if (state.config.userWantToDefineDOF === false) {
          state.reactVertices.map((vertex, index) => {
            vertex.userDOF = `${index + 1}`
            state.reactVertices[index].userDOF = `${index + 1}`
          })
        }
        // Casting de datos
        const copyVertices: IParsedVertexData[] = state.reactVertices.map(
          (e) => {
            const displacementNumber = Number(e.displacement)
            const forceNumber = Number(e.force)
            const userDOFNumber = Number(e.userDOF)
            return {
              id: e.name,
              force: forceNumber,
              displacement: displacementNumber,
              isRestricted: e.isRestricted,
              userDOF: { x: userDOFNumber },
            }
          }
        )

        const copyEdges: IParsedEdgeData[] = state.reactEdges.map((e) => {
          const kNumber = Number(e.k)
          return {
            id: e.name,
            from: e.from,
            to: e.to,
            k: kNumber,
          }
        })

        // Creando los vertices
        const vertices = new Vertices()
        copyVertices.map((vertex) => {
          try {
            vertices.add(vertex)
          } catch (e) {
            if (e instanceof Error) {
              state.errors.vertices.push({
                name: 'Error al agregar nudo',
                message: `Ha ocurrido un error al agregar el nudo ${vertex.id}!: ${e.message}`,
                typeError: 'addVertex',
                errorCode: 10,
              })
            }
          }
        })

        // Creando los resortes
        const edges = new Edges(vertices.getData())
        copyEdges.map((edge) => {
          try {
            edges.add(edge)
          } catch (e) {
            if (e instanceof Error) {
              state.errors.edges.push({
                name: 'Error al agregar resorte',
                message: `Ha ocurrido un error al agregar el resorte ${edge.id}!: ${e.message}`,
                typeError: 'addEdge',
                errorCode: 11,
              })
            }
          }
        })

        const spring = new Spring(edges.getData())

        state.res.orderDOF = spring.generateOrderDOF({
          isRestrictedAbove: state.config.isRestrictedAbove,
        })

        spring.createDictionary()

        state.res.locals = spring.generateLocals()

        spring.generateData()

        state.res.utils.kGlobalHistory = spring.buildGlobalBySteps()
        // console.log(state.res.utils.kGlobalHistory)

        state.res.k.global = spring.buildGlobal()
        const { krr, kru, kur, kuu } = spring.splitGlobal()
        state.res.k.krr = krr
        state.res.k.kru = kru
        state.res.k.kur = kur
        state.res.k.kuu = kuu

        const {
          global: fGlobal,
          restricted: fRestricted,
          unrestricted: fUnrestricted,
        } = spring.buildForces()
        state.res.f.global = fGlobal
        state.res.f.restricted = fRestricted
        state.res.f.unrestricted = fUnrestricted

        const {
          global: uGlobal,
          restricted: uRestricted,
          unrestricted: uUnrestricted,
        } = spring.buildDisplacement()
        state.res.u.global = uGlobal
        state.res.u.restricted = uRestricted
        state.res.u.unrestricted = uUnrestricted

        const { ok, message, uuSolved } = spring.solveDisplacements()
        if (ok) {
          state.res.u.solved = uuSolved
          state.res.f.solved = spring.solveForces()
          spring.buildNumericFandU()
          state.res.utils.internalForces = spring.solveInternalForces()
        } else {
          state.errors.logic.push({
            name: 'Error al resolver desplazamientos',
            message: message,
            typeError: 'SolveUError',
            errorCode: 12,
          })
        }

        //end of function
      })
    },
  }))
)
