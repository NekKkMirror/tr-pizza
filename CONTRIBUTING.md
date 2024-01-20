## Code style

##### I use Prettier with config settings from [.prettierrc](https://gitlab.aqsi.ru/pg-group/development/web/aqsi-cube-new/cube-backend/-/blob/develop/.prettierrc) file.

## Before starting, you need to create an assembly [dockerfile](dockerfile)

##### This command will create (only on first run) and start three docker containers for you.

##### Application container will run the application with file watching in your local (not inside container) working (current) directory.

##### Please refer to [docker-compose.local.yml](docker-compose.local.yml) file to see what environment variables are available for the application.

#### You need [.env](.env) file to get started

## Setup:

- #### Run the following command
  ``` postcss
      cp .env.local .env
  
      # or link with
      ln -s .env.local .env
  ```
  
- #### Build container 
  ``` postcss
      # You can build container
      make compose-build
  
      # Or build and start app
      # Skip first step if you next intend to run a local setup
      make compose-build-run-dev
  ```

## Running the pizza app local with file watch and hot reload

## Local setup:

- ### Let's launch the project
    ``` postcss
    make app-run-dev
    ```

- ### Stopping container
   ``` postcss
   make compose-down
   ```
- ### Stopping container with volumes
   ``` postcss
   make compose-down-v
   ```

Enjoy!
