export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const PeliculaPartsFragmentDoc = gql`
    fragment PeliculaParts on Pelicula {
  __typename
  title
  poster
  cancelled
  youtubeTrailer
  synopsis
  credits
  showDate
  showTime
  showEndTime
  forceShow
  category
  hiddenFromCartelera
  duration
  country
  location {
    ... on Ubicacion {
      __typename
      title
      address
      mapCoordinates
      instagramReel
      image
    }
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
  }
  isPartOfEvent {
    ... on Evento {
      __typename
      title
      badgeText
      poster
      cancelled
      youtubeTrailer
      description
      date
      endDate
      eventTime
      eventEndTime
      location {
        ... on Ubicacion {
          __typename
          title
          address
          mapCoordinates
          instagramReel
          image
        }
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
      }
      shortFilms {
        __typename
        title
        director
        duration
        synopsis
      }
    }
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
  }
}
    `;
export const EventoPartsFragmentDoc = gql`
    fragment EventoParts on Evento {
  __typename
  title
  badgeText
  poster
  cancelled
  youtubeTrailer
  description
  date
  endDate
  eventTime
  eventEndTime
  location {
    ... on Ubicacion {
      __typename
      title
      address
      mapCoordinates
      instagramReel
      image
    }
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
  }
  shortFilms {
    __typename
    title
    director
    duration
    synopsis
  }
}
    `;
export const UbicacionPartsFragmentDoc = gql`
    fragment UbicacionParts on Ubicacion {
  __typename
  title
  address
  mapCoordinates
  instagramReel
  image
}
    `;
export const QuienesSomosPartsFragmentDoc = gql`
    fragment QuienesSomosParts on QuienesSomos {
  __typename
  title
  image
  content
}
    `;
export const PeliculaDocument = gql`
    query pelicula($relativePath: String!) {
  pelicula(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PeliculaParts
  }
}
    ${PeliculaPartsFragmentDoc}`;
export const PeliculaConnectionDocument = gql`
    query peliculaConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PeliculaFilter) {
  peliculaConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PeliculaParts
      }
    }
  }
}
    ${PeliculaPartsFragmentDoc}`;
export const EventoDocument = gql`
    query evento($relativePath: String!) {
  evento(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EventoParts
  }
}
    ${EventoPartsFragmentDoc}`;
export const EventoConnectionDocument = gql`
    query eventoConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EventoFilter) {
  eventoConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EventoParts
      }
    }
  }
}
    ${EventoPartsFragmentDoc}`;
export const UbicacionDocument = gql`
    query ubicacion($relativePath: String!) {
  ubicacion(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...UbicacionParts
  }
}
    ${UbicacionPartsFragmentDoc}`;
export const UbicacionConnectionDocument = gql`
    query ubicacionConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: UbicacionFilter) {
  ubicacionConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...UbicacionParts
      }
    }
  }
}
    ${UbicacionPartsFragmentDoc}`;
export const QuienesSomosDocument = gql`
    query quienesSomos($relativePath: String!) {
  quienesSomos(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...QuienesSomosParts
  }
}
    ${QuienesSomosPartsFragmentDoc}`;
export const QuienesSomosConnectionDocument = gql`
    query quienesSomosConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: QuienesSomosFilter) {
  quienesSomosConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...QuienesSomosParts
      }
    }
  }
}
    ${QuienesSomosPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    pelicula(variables, options) {
      return requester(PeliculaDocument, variables, options);
    },
    peliculaConnection(variables, options) {
      return requester(PeliculaConnectionDocument, variables, options);
    },
    evento(variables, options) {
      return requester(EventoDocument, variables, options);
    },
    eventoConnection(variables, options) {
      return requester(EventoConnectionDocument, variables, options);
    },
    ubicacion(variables, options) {
      return requester(UbicacionDocument, variables, options);
    },
    ubicacionConnection(variables, options) {
      return requester(UbicacionConnectionDocument, variables, options);
    },
    quienesSomos(variables, options) {
      return requester(QuienesSomosDocument, variables, options);
    },
    quienesSomosConnection(variables, options) {
      return requester(QuienesSomosConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
