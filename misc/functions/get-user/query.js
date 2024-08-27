import AWS from '@aws-sdk/client-athena'
const athena = new AWS.Athena()

// Function to build an array of rows from the Athena query results
function processRows (queryResults, rows, cols) {
  queryResults.ResultSet.Rows.map(result => {
    let row = {}
    result.Data.map((r, i) => {
      row[cols[i]] = r.VarCharValue
    })
    rows.push(row)
  })
  return rows
}

function sleep (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const executeQuery = async function (event) {
  // console.log('ATHENA:', athena);

  const paramsQuery = {
    QueryExecutionContext: { Database: 'my-people-db' },
    QueryString: `SELECT * FROM "my-people-db"."data" limit 10;`,
    ResultConfiguration: {
      OutputLocation: 's3://my-people-bucket/output/'
    }
  }

  const queryExecution = await athena.startQueryExecution(paramsQuery)
  console.log('queryExecution: ', queryExecution)
  console.log('QueryExecutionId: ', queryExecution.QueryExecutionId)

  let queryStatus = ''
  const paramsStatus = { QueryExecutionId: queryExecution.QueryExecutionId }

  for (let i = 1; i < 12; i++) {
    await sleep(1000)
    queryStatus = await athena.getQueryExecution(paramsStatus)
    console.log(
      'QueryExecutionStatus: ',
      queryStatus.QueryExecution.Status.State
    )
    if (queryStatus.QueryExecution.Status.State === 'SUCCEEDED') {
      break
    }
  }

  // If Athena query completes successfully then proceed
  if (queryStatus.QueryExecution.Status.State === 'SUCCEEDED') {
    // Get Athena query results
    let paramsResults = {
      QueryExecutionId: queryExecution.QueryExecutionId,
      MaxResults: 1000
    }
    let queryResults = await athena.getQueryResults(paramsResults)

    // Build an array of columns from the Athena query results
    let cols = []
    queryResults.ResultSet.ResultSetMetadata.ColumnInfo.map(c => {
      cols.push(c.Name)
    })

    // Get first batch of rows
    let rows = processRows(queryResults, [], cols)

    // Get additional Athena query results if more than MaxResults
    while (queryResults.NextToken) {
      paramsResults = {
        QueryExecutionId: queryExecution.QueryExecutionId,
        MaxResults: 1000,
        NextToken: queryResults.NextToken
      }
      queryResults = await athena.getQueryResults(paramsResults)
      // Get additional batch of rows
      rows = processRows(queryResults, rows, cols)
    }

    // Remove the first row, since it contains the column names only
    rows.shift()

    // Loop through all rows and log each row
    for (const row of rows) {
      console.log(row)
    }

    return rows
  }
}
