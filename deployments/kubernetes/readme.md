# Kubernetes
The files contained here may be applied to a Kubernetes cluster running the NGinx ingress controller to deploy the App Dash with an ingress at the root address.

## Setup
- First, update the `namespace:` property on each of the files to ensure the resources get deployed to the right place

- Next, ensure the `deployment.yml` has the correct `image:` tag for the image you are using.

- Then, update the `secret.yml` file with the proper values for your configuration.

- You will need to encode the values into a base64 format. This can be done with the following command(s):

    - Mac / Linux
        ```
        echo -n 'mongodb+srv://...' | base64
        ```
    - Windows
        ```
        $TEXT = 'mongodb+srv://...'
        $ENCODED = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($TEXT))
        Write-Output $ENCODED
        ```
    - Online
        - [base64decode.org](https://www.base64decode.org/)

## Deployment
Using the `kubectl` CLI, you may apply this directory:
```
kubectl apply -f ./
```

Or, individually to ensure each is properly deployed before moving to the next:
```
kubectl apply -f secret.yml
kubectl apply -f deployment.yml
kubectl apply -f service.yml
kubectl apply -f ingress.yml
```