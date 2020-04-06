FROM continuumio/miniconda:latest

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

RUN apt-get update && apt-get upgrade -y && apt-get install -qqy \
    wget \
    bzip2 \
    graphviz \
    libssl-dev \
    openssh-server

RUN curl -sL https://deb.nodesource.com/setup_13.x | bash - && apt-get install -y nodejs && apt-get install -y npm

RUN mkdir -p /backend
COPY ./backend/requirements.yml /backend/requirements.yml
RUN /opt/conda/bin/conda env create -f /backend/requirements.yml
ENV PATH /opt/conda/envs/orca_backend/bin:$PATH

ENV PYTHONDONTWRITEBYTECODE 1
RUN echo "source activate orca_backend" >~/.bashrc

COPY ./scripts /scripts
RUN chmod +x ./scripts*

COPY ./backend /backend

RUN mkdir -p /frontend
RUN mkdir -p /frontend_tmp

WORKDIR frontend_tmp

COPY ./frontend/package.json /frontend_tmp/
RUN npm i
COPY ./frontend /frontend_tmp
RUN npm run build

WORKDIR /backend
