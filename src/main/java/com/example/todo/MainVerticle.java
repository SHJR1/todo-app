package com.example.todo;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Handler;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.mysqlclient.MySQLConnectOptions;
import io.vertx.sqlclient.Pool;
import io.vertx.sqlclient.PoolOptions;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;
import io.vertx.ext.web.handler.CorsHandler;

public class MainVerticle extends AbstractVerticle {


  @Override
  public void start() {
    
    MySQLConnectOptions options = new MySQLConnectOptions()
      .setPort(3306)
      .setHost("localhost")
      .setDatabase("todo_db")
      .setUser("root")
      .setPassword("");

    Pool pool = Pool.pool(vertx, options, new PoolOptions().setMaxSize(4));

    //creatingData from method below
    //createSomeData(pool);

    //create router to use for routes
    Router router = Router.router(vertx);

    //fix cors browser issue
    router.route().handler(CorsHandler.create("*")
      .allowedMethod(io.vertx.core.http.HttpMethod.GET)
      .allowedMethod(io.vertx.core.http.HttpMethod.POST)
      .allowedMethod(io.vertx.core.http.HttpMethod.OPTIONS)
      .allowedHeader("Access-Control-Request-Method")
      .allowedHeader("Access-Control-Allow-Credentials")
      .allowedHeader("Access-Control-Allow-Origin")
      .allowedHeader("Access-Control-Allow-Headers")
      .allowedHeader("Content-Type"));


    //simple get route for the static route /
    router.route("/").handler(routingContext -> {
      HttpServerResponse res = routingContext.response();
      res
        .putHeader("content-type", "text/html")
        .end("</pre><h1>Hello from my first Vert.x app</h1><pre>");
    });

    //when route is hit, call getAll method below
    router.get("/api/tasks").handler(getAll(pool));
    //first line enables the reading of the request body for all routes under /api/tasks
    //second line routes the POST and once its hit, call the addOne method below
    router.route("/api/tasks*").handler(BodyHandler.create());
    router.post("/api/tasks").handler(addOne(pool));
    //the path passes through the id of the tasks we want to delete and calls deleteOne method
    router.delete("/api/tasks/:id").handler(deleteOne(pool));
    //route passes a tasks by id and access it
    router.get("/api/tasks/:id").handler(getOne(pool));
    //route passes a tasks by ID to update
    router.put("/api/tasks/:id").handler(updateOne(pool));
    /*
     * Routes request on /assets/{insertAssetNameHere} to resources stored in the assets folder
     * ex: http://localhost:8888/assets/index.html will serve the index.html page
     * */
    router.route("/assets/*").handler(StaticHandler.create("assets"));

    vertx.createHttpServer()
      .requestHandler(router)
      .listen(8888)
      .onSuccess(server ->
        System.out.println("HTTP server started on port " + server.actualPort()))
      .onFailure(event -> System.out.println("Failed to start HTTP server: " + event.getMessage()));

  }


  //create a Task using the Todo class
  private void createSomeData(Pool pool) {
    Todo task1 = new Todo("Take out the trash");

    pool
      .query("CREATE TABLE if not exists tasks(id int NOT NULL AUTO_INCREMENT,task varchar(255), PRIMARY KEY(id))")
      .execute()
      .compose(r ->
        pool
          .query("INSERT INTO tasks (task) VALUES ('"+task1.getTask()+"')")
          .execute()
      );
  }
  //this shows all the values of the tasks in JSON format *READ*
  private Handler<RoutingContext> getAll(Pool pool){
    return routingContext -> {
      JsonArray jsonArray = new JsonArray();
      pool
        .query("SELECT * FROM tasks")
        .execute(ar -> {
          if(ar.succeeded()) {
            RowSet<Row> rows = ar.result();
            for (Row row : rows) {
              JsonObject json = row.toJson();
              jsonArray.add(json);
            }
            routingContext
              .response()
              .setStatusCode(200)
              .end(Json.encodePrettily(jsonArray));
          } else {
            routingContext
              .response()
              .setStatusCode(400)
              .end(ar.cause().getMessage());
          }
        });
    };
  }
  //this adds a task to the list *CREATE*
  private Handler<RoutingContext> addOne(Pool pool){
    return routingContext -> {
      //create JSONObject from request body
      JsonObject taskToAdd = routingContext.getBodyAsJson();
      pool
        .query("INSERT INTO tasks (task) VALUES ('"+taskToAdd.getString("task")+"')")
        .execute(ar -> {
          if(ar.succeeded()){
            routingContext
              .response()
              .setStatusCode(200)
              .end();
          } else {
            routingContext
              .response()
              .setStatusCode(400)
              .end(ar.cause().getMessage());
          }
        });
    };
  }
  //this deletes a task from the list *DELETE*
  private Handler<RoutingContext> deleteOne(Pool pool) {
    return routingContext -> {
      //get id from parameters of request
      String id = routingContext.request().getParam("id") ;
      try{
        //convert id to integer
        Integer idAsInteger = Integer.valueOf(id);
        pool
          .query("DELETE FROM tasks WHERE id="+idAsInteger+"")
          .execute(ar -> {
            if(ar.succeeded()){
              routingContext
                .response()
                .setStatusCode(200)
                .end();
            } else {
              routingContext
                .response()
                .setStatusCode(400)
                .end(ar.cause().getMessage());
            }
          });
      } catch(NumberFormatException nfe) {
        routingContext.response().setStatusCode(400).end();
        // ^ just in case String ID could not be converted
      }
    };
  }
  //  //this gets a task by a specific id passed in
  private Handler<RoutingContext> getOne(Pool pool) {
    return routingContext -> {
      String id = routingContext.request().getParam("id");
      try {
        Integer idAsInteger = Integer.valueOf(id);
        pool
          .query("SELECT * FROM tasks WHERE id="+idAsInteger+"")
          .execute(ar -> {
            if(ar.succeeded()){
              RowSet<Row> rows = ar.result();
              for (Row row : rows) {
                JsonObject task = row.toJson();
                routingContext
                  .response()
                  .setStatusCode(200)
                  .end(Json.encodePrettily(task));
              }
            } else {
              routingContext
                .response()
                .setStatusCode(400)
                .end(ar.cause().getMessage());
            }
          });
      } catch (NumberFormatException e) {
        routingContext.response().setStatusCode(400).end();
      }
    };
  }

  private Handler<RoutingContext> updateOne(Pool pool) {
    return routingContext -> {
      String id = routingContext.request().getParam("id");
      JsonObject body = routingContext.getBodyAsJson();
      String task = body.getString("task");
      try {
        Integer idAsInteger = Integer.valueOf(id);
        pool
          .query("UPDATE tasks SET task='"+task+"'")
          .execute(ar -> {
            if (ar.succeeded()){
              routingContext
                .response()
                .setStatusCode(200)
                .end();
            } else {
              routingContext
                .response()
                .setStatusCode(400)
                .end(ar.cause().getMessage());
            }
          });
      } catch (NumberFormatException e) {
        routingContext.response().setStatusCode(400).end();
      }
    };
  }

}
