const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

const tableName = "posts";

function create(event, context, callback) {
  const item = JSON.parse(event.body);

  dynamo.put(
    {
      Item: item,
      TableName: tableName,
    },
    (err, resp) => {
      if (err) {
        callback(err);
      } else {
        callback(null, {
          statusCode: 201,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body:  "Created todo",
        });
      }
    }
  );
}

function list(event, context, callback) {
  dynamo.scan(
    {
      TableName: tableName,
    },
    (err, data) => {
      if (err) {
        callback(err);
      } else {
        const todos = data.Items;
        callback(null, {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(todos),
        });
      }
    }
  );
}

module.exports = {
  create,
  list
};
