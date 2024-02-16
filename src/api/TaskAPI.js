import axios from 'axios'

const url_get_tasks = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/task?key=" + import.meta.env.VITE_API_KEY

export function getTasks(){

    try{

        return axios.get(url_get_tasks)
        .then(function(response){
            let tasksFirebase = response.data.documents
            let tasks = []

            if(tasksFirebase !== undefined){
                for(let ts of tasksFirebase){
                    let task = {
                        id: ts.name.split('/task/')[1],
                        content: ts.fields.content.stringValue,
                        tableId: ts.fields.tableId.stringValue,
                    }
                    tasks.push(task)
                }
                return tasks                
            }
            return []

        })

    } catch(e){
        console.error(e)
    }

}

export function deleteTasksAPI(id){

    const url_delete_task = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/task/" + id + "?key=" + import.meta.env.VITE_API_KEY

    try{

        return axios.delete(
            url_delete_task
        )
        .then(function(response){
            console.log(response)
        })

    } catch(e){
        console.error(e)
    }

}



const url_add_task = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/task?key=" + import.meta.env.VITE_API_KEY

export function addTaskAPI(content, tableId){

    try{

        return axios.post(
            url_add_task,
            {
                "fields": {
                  "content": {
                    "stringValue": content
                  },
                  "tableId": {
                    "stringValue": tableId
                  }
                }
              }
        )
        .then(function(response){
            return response.data.name.split("/table/")[1]
        })

    } catch(e){
        console.error(e)
    }

}


export function updateTaskAPI(id, content, tableId){

    const url_update_task = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/task/" + id + "?key=" + import.meta.env.VITE_API_KEY

    try{

        return axios.patch(
            url_update_task,
            {
                "fields": {
                  "content": {
                    "stringValue": content
                  },
                  "tableId": {
                    "stringValue": tableId
                  }
                }
              }
        )
        .then(function(response){
            console.log(response)
        })

    } catch(e){
        console.error(e)
    }

}
