docker build -t psxcode/assignment:latest .

printf "2\n10 22\nE 2\nN 1\nS 1\nW 2" | docker run -i --rm --name ass psxcode/assignment
