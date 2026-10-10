// To add a project: copy one entry, change the id, fill in the details, save. It appears on the home page automatically.
// Screenshots: put images in /images and list them in `shots`. Architecture: draw it as text or point `diagram` to an image.
const PROJECTS = [
{
 id:"dockerized-web-app", tool:"Docker", title:"Dockerized Web Application",
 summary:"Build a Docker image, run a container, map ports and persist data with a volume.",
 stack:["Docker","Dockerfile","Nginx"],
 overview:"Packages a static website into an Nginx image, runs it as a container and keeps its content in a named volume.",
 diagram:"Browser :8080  -->  Docker host  -->  Container (nginx :80)  -->  Volume: site-data",
 steps:[
  {t:"Write the Dockerfile",c:"FROM nginx:alpine\nCOPY ./site /usr/share/nginx/html\nEXPOSE 80"},
  {t:"Build the image",c:"docker build -t my-site:1.0 ."},
  {t:"Run with port mapping and a volume",c:"docker run -d --name my-site -p 8080:80 -v site-data:/usr/share/nginx/html my-site:1.0"},
  {t:"Check it works",c:"curl -I http://localhost:8080\ndocker logs my-site"}
 ],
 troubleshooting:["Port already in use: change 8080 to a free port.","Container exits at once: run docker logs <name> to see why."],
 shots:[{src:"images/docker-1.png",cap:"Container running"}],
 repo:"https://github.com/YOUR-USERNAME/dockerized-web-app", demo:""
},
{
 id:"kubernetes-app-deploy", tool:"Kubernetes", title:"Deploy an App on Kubernetes",
 summary:"Run a three-tier app on Minikube with Deployments, Services and a ConfigMap.",
 stack:["Kubernetes","Minikube","kubectl"],
 overview:"Deploys a React frontend, Node.js API and MongoDB to a local Minikube cluster.",
 diagram:"Ingress --> frontend Service --> API Service --> MongoDB Service (PVC)",
 steps:[
  {t:"Start the cluster",c:"minikube start --driver=docker"},
  {t:"Apply the manifests",c:"kubectl apply -f k8s/"},
  {t:"Check pods and services",c:"kubectl get pods,svc\nkubectl logs deploy/api"},
  {t:"Open the app",c:"minikube service frontend --url"}
 ],
 troubleshooting:["Pod in ImagePullBackOff: check the image name and tag.","Pending PVC: confirm a default storage class exists."],
 shots:[{src:"images/k8s-1.png",cap:"kubectl get pods"}],
 repo:"https://github.com/YOUR-USERNAME/k8s-three-tier-app", demo:""
},
{
 id:"jenkins-cicd-pipeline", tool:"Jenkins", title:"Automated CI/CD Pipeline",
 summary:"A Jenkins pipeline that builds, tests and deploys on every push to GitHub.",
 stack:["Jenkins","Git","Docker"],
 overview:"A Jenkinsfile pipeline triggered by a GitHub webhook: build, test, build image, push, deploy.",
 diagram:"GitHub push --> Webhook --> Jenkins --> Build/Test --> Docker image --> Deploy",
 steps:[
  {t:"Add a Jenkinsfile",c:"pipeline {\n  agent any\n  stages {\n    stage('Build'){ steps { sh 'npm ci' } }\n    stage('Test'){ steps { sh 'npm test' } }\n    stage('Image'){ steps { sh 'docker build -t app:${BUILD_NUMBER} .' } }\n  }\n}"},
  {t:"Connect the webhook",c:"GitHub repo > Settings > Webhooks > http://<jenkins-host>/github-webhook/"}
 ],
 troubleshooting:["Webhook not firing: check the Jenkins URL is publicly reachable."],
 shots:[{src:"images/jenkins-1.png",cap:"Pipeline stage view"}],
 repo:"https://github.com/YOUR-USERNAME/jenkins-cicd", demo:""
},
{
 id:"aws-highly-available-site", tool:"AWS", title:"Highly Available AWS Website",
 summary:"A website behind an Application Load Balancer and Auto Scaling across two zones.",
 stack:["AWS","EC2","ALB","Auto Scaling"],
 overview:"EC2 instances in two Availability Zones behind an ALB, scaled by CPU, with health checks.",
 diagram:"Users --> ALB --> EC2 (AZ-a) + EC2 (AZ-b) <-- Auto Scaling Group",
 steps:[
  {t:"Create the launch template",c:"aws ec2 create-launch-template --launch-template-name web-lt --launch-template-data file://lt.json"},
  {t:"Create the load balancer",c:"aws elbv2 create-load-balancer --name web-alb --subnets <subnet-a> <subnet-b>"}
 ],
 troubleshooting:["Targets unhealthy: check security group allows ALB to reach port 80."],
 shots:[{src:"images/aws-1.png",cap:"Target group health"}],
 repo:"https://github.com/YOUR-USERNAME/aws-ha-website", demo:""
}
];
