# code viewer (version 1)
## jupyter를 이용한 원활한 교육 진행을 보조하는 web service
https://lodos14.github.io/code_viewer/#/

## 1. 프로젝트 환경
![환경](https://user-images.githubusercontent.com/81665608/132830954-663772c8-17d5-4132-9681-51c2b4c64261.png)

## 2. 프로젝트 배경
- 최근 인공지능의 발달로 인해 인공지능 연구가 활발히 진행
- 전문인재 수요의 급증으로 인공지능 관력 학과 설립 증대
- 인공지능 연구와 학습에 최적인 Jupyter Notebook 과 Jupyterlab의 사용 증가
- 교육자가 학생들에게 과제를 주었을 때 과제의 빈도수와 학생들이 많을 수록 제출한 과제 파일들을 관리하기가 어렵다.
- github도 마찬가지로 학생들 주소를 일일이 접속해야 하므로 과제 확인 작업이 번거롭다
- 교육자가 학생들의 수준을 파악하기 위해 간단한 테스트를 볼 때 학생들의 테스트 결과를 일일이 확인하기 번거로운 점이 있다.

![인공지능 뉴스 2](https://user-images.githubusercontent.com/81665608/132664981-3f4cc865-bb8c-4193-9d9d-378012eeac30.png)<br>
참조[https://www.chosun.com/special/special_section/2021/04/12/EOYWWWGCPVD2LO73VTUTDXBCPA/]

![인공지능 뉴스 3](https://user-images.githubusercontent.com/81665608/132664988-3eb38aa0-75cb-439a-a448-a2a068afcf34.png)<br>
참조[https://www.asiatime.co.kr/article/20210528500102?1=1]

## 3. 프로젝트 개요
### Code Viewer 프로젝트는 jupyter notebook 또는 jupyterlab cell에 학생들이 작성한 코드 내용을 Python을 통해 추출해서 Firebase로 넘겨주고 제출한 코드를 데이터 베이스에 쿼리하여 React JS를 이용한 Code Viewer web Service를 구현하는 것을 목표로 함.

![개요](https://user-images.githubusercontent.com/81665608/132831130-e0793517-6b9e-4d5c-8e92-1d7b0ded2d7c.png)

## 4. 프로젝트 과정
### 4.1 코드 추출
#### 4.4.1 IPython
##### 먼저 IPython은 Jupyter Notebook, Jupyterlab의 커널로 사용이 되고 있고, 아나콘다 파이썬을 설치하면 자동으로 IPython의 패키지가 설치된다. IPython 패키지의 History.py에 있는 HistoryManager 객체가 Jupyter의 모든 실행 이력을 관리하는데 실행 이력을 호출하기 위해 다음 4.4.2와 같이 한다. 

#### 4.4.2 get_ipython()


